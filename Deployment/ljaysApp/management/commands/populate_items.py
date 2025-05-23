from django.core.management.base import BaseCommand
from ljaysApp.models import Item

class Command(BaseCommand):
    help = "Populate the database with initial items"

    def handle(self, *args, **kwargs):
        items = [
            # Main Dishes
            {'name': 'Pork Adobo', 'item_id': 'adobo', 'price': 120, 'category': 'main_dish'},
            {'name': 'Fried Chicken', 'item_id': 'chicken', 'price': 110, 'category': 'main_dish'},
            {'name': 'Sisig', 'item_id': 'sisig', 'price': 130, 'category': 'main_dish'},
            {'name': 'Pepperoni Pizza', 'item_id': 'pizza', 'price': 200, 'category': 'main_dish'},
            {'name': 'Menudo', 'item_id': 'menudo', 'price': 150, 'category': 'main_dish'},
            {'name': 'Chicken Afritada', 'item_id': 'afritada', 'price': 130, 'category': 'main_dish'},
            {'name': 'Beef Kaldereta', 'item_id': 'kaldereta', 'price': 150, 'category': 'main_dish'},
            {'name': 'Beef Steak', 'item_id': 'beefsteak', 'price': 120, 'category': 'main_dish'},
            {'name': 'Pork BBQ', 'item_id': 'bbq', 'price': 100, 'category': 'main_dish'},
            {'name': 'Embutido', 'item_id': 'embutido', 'price': 130, 'category': 'main_dish'},
            {'name': 'Shanghai Lumpia (5x)', 'item_id': 'lumpia', 'price': 100, 'category': 'main_dish'},
            {'name': 'Pancit Guisado', 'item_id': 'pancit', 'price': 100, 'category': 'main_dish'},
            {'name': 'Chicken Curry', 'item_id': 'curry', 'price': 150, 'category': 'main_dish'},
            {'name': 'Chicken Fillet', 'item_id': 'fillet', 'price': 130, 'category': 'main_dish'},
            {'name': 'Spaghetti', 'item_id': 'spaghetti', 'price': 100, 'category': 'main_dish'},

            # Rice
            {'name': 'Plain Rice', 'item_id': 'plain_rice', 'price': 20, 'category': 'rice'},
            {'name': 'Fried Rice', 'item_id': 'fried_rice', 'price': 30, 'category': 'rice'},
            {'name': 'Kimchi Rice', 'item_id': 'kimchi_rice', 'price': 30, 'category': 'rice'},

            # Beverages
            {'name': 'Mango Juice 1000mL', 'item_id': 'mango', 'price': 100, 'category': 'beverage'},
            {'name': 'Orange Juice 1000mL', 'item_id': 'orange', 'price': 100, 'category': 'beverage'},
            {'name': 'Cucumber Juice 1000mL', 'item_id': 'cucumber', 'price': 100, 'category': 'beverage'},
            {'name': 'Melon Juice 1000mL', 'item_id': 'melon', 'price': 100, 'category': 'beverage'},
            {'name': 'Buko Juice 1000mL', 'item_id': 'buko', 'price': 100, 'category': 'beverage'},
            {'name': 'Iced Tea 1000mL', 'item_id': 'iced_tea', 'price': 115, 'category': 'beverage'},
            {'name': 'Blue Lemonade 1000mL', 'item_id': 'blue_lemonade', 'price': 100, 'category': 'beverage'},
            {'name': 'Pepsi 1.5 L', 'item_id': 'pepsi', 'price': 75, 'category': 'beverage'},
            {'name': 'Mountain Dew 1.5 L', 'item_id': 'mountaindew', 'price': 75, 'category': 'beverage'},
            {'name': '7-up 1.5 L', 'item_id': 'seven_up', 'price': 75, 'category': 'beverage'},
        ]

        for item in items:
            Item.objects.update_or_create(
                item_id=item['item_id'],
                defaults={
                    'name': item['name'],
                    'price': item['price'],
                    'category': item['category'],
                }
            )

        self.stdout.write(self.style.SUCCESS("Items populated successfully."))