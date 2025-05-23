from django.db import models
from django.contrib.auth.models import User
import json
from django.core.exceptions import ValidationError

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('preparing', 'Preparing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    package_name = models.CharField(max_length=255, blank=True, null=True)
    items = models.TextField()  # JSON string
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Preparing')
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        # Validate that `items` is a valid JSON string
        try:
            json.loads(self.items)
        except json.JSONDecodeError:
            raise ValidationError("The 'items' field must contain valid JSON data.")

    def __str__(self):
        return f"Transaction {self.id} by {self.user.username}"

class Order(models.Model):
    name = models.CharField(max_length=255, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_quantity = models.PositiveIntegerField(default=0)

    def calculate_total_price(self):
        """Calculate and update the total price and total quantity."""
        self.total_price = sum(item.quantity * item.unit_price for item in self.items.all())
        self.total_quantity = sum(item.quantity for item in self.items.all())
        self.save()

    def __str__(self):
        return f"Order #{self.id} by {self.created_by.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total_price(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.name} x{self.quantity}"

class Item(models.Model):
    CATEGORY_CHOICES = [
        ('main_dish', 'Main Dish'),
        ('rice', 'Rice'),
        ('beverage', 'Beverage'),
    ]

    name = models.CharField(max_length=255)
    item_id = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.category}) - ₱{self.price}"