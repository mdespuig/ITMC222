from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db.models import Q
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Profile, Transaction, Order, OrderItem, Item
import json
from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.urls import reverse

def home(request):
 return render(request, "homepage.html")

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()

        if not username or not password:
            messages.error(request, "All fields are required.")
            return render(request, 'login.html')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            auth_login(request, user)
            
            if user.username.strip().lower() == 'admin':
                return redirect('admin_page')
            elif user.is_staff:
                return redirect('admin_page')
            else:
                return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, 'login.html')

    return render(request, 'login.html')


def registration(request):
 if request.method == 'POST':
    username = request.POST.get('username', '').strip()
    password = request.POST.get('password', '').strip()
    confirm_password = request.POST.get('confirm-password', '').strip()

    if not username or not password or not confirm_password:
        messages.error(request, "All fields are required.")
        return render(request, 'registration.html')

    if password != confirm_password:
        messages.error(request, "Passwords do not match.")
        return render(request, 'registration.html')

    if User.objects.filter(username=username).exists():
        messages.error(request, "Username is already taken.")
        return render(request, 'registration.html')

    user = User.objects.create(
        username=username,
        password=make_password(password)
    )
    return redirect('login')

 return render(request, 'registration.html')

def logout_user(request):
 logout(request)
 return render(request, 'homepage.html')

@login_required
def admin_page(request):
    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponse("Access denied", status=403)

    return render(request, 'admin_page.html', {
        'is_staff': request.user.is_staff
    })

@login_required
def admin_userm(request):
    # Ensure only superusers can access this view
    if not request.user.is_superuser:
        return HttpResponse("Access denied", status=403)

    # Handle user deletion (only superusers can delete users)
    if request.method == 'POST':
        for key in request.POST:
            if key.startswith("user_"):
                user_id = key.split("_")[1]
                try:
                    user = User.objects.get(id=user_id)
                    if user.username.lower() != 'admin':  # Prevent deletion of the admin user
                        user.delete()
                except User.DoesNotExist:
                    continue
        return redirect('admin_user')

    # Handle search functionality
    search_query = request.GET.get('search', '').strip()
    users = User.objects.exclude(username__iexact='admin')  # Exclude the admin user
    if search_query:
        users = users.filter(Q(username__icontains=search_query))

    # Render the template with the list of users
    return render(request, 'admin_userm.html', {
        'users': users,
        'search_query': search_query,
        'is_staff': request.user.is_staff
    })

def insert_user(request):
    if request.method == 'POST':
        username = request.POST.get('username').strip()
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        user_type = request.POST.get('user_type')

        if not username or not password or not confirm_password:
            messages.error(request, "All fields are required.")
            return redirect('admin_userm')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('admin_userm')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect('admin_userm')

        user = User(
            username=username,
            password=make_password(password),
            is_staff=True if user_type == 'staff' else False
        )
        user.save()
        messages.success(request, "User created successfully.")
        return redirect('admin_user')

@login_required
def user_detail(request, user_id):
    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponse("Access denied", status=403)

    user = get_object_or_404(User, id=user_id)

    if user.username.lower() == 'admin':
        return redirect('admin_userm')

    # Fetch transactions and include package_name
    transactions = Transaction.objects.filter(user=user).order_by('-created_at')
    for transaction in transactions:
        try:
            # Parse the items JSON string
            items_list = json.loads(transaction.items)
            transaction.items_list = [
                {"name": item["name"], "quantity": item["quantity"]}
                for item in items_list
            ]
        except (json.JSONDecodeError, KeyError):
            transaction.items_list = []

    if request.method == 'POST' and request.user.is_superuser:
        user.first_name = request.POST.get('first_name', '').strip()
        user.last_name = request.POST.get('last_name', '').strip()
        user.email = request.POST.get('email', '').strip()
        user.profile.contact_number = request.POST.get('contact_number', '').strip()
        user.profile.address = request.POST.get('address', '').strip()
        user.profile.position = request.POST.get('position', '').strip()
        user.profile.save()

        user_type = request.POST.get('user_type', 'customer')
        user.is_staff = True if user_type == 'staff' else False
        user.save()

        if request.user.username.lower() == 'admin':
            for transaction in transactions:
                status_key = f'status_{transaction.id}'
                new_status = request.POST.get(status_key)
                if new_status in dict(Transaction.STATUS_CHOICES):
                    transaction.status = new_status
                    transaction.save()

        delete_ids = [id for id in request.POST.getlist('delete_ids') if id.isdigit()]
        if delete_ids:
            Transaction.objects.filter(id__in=delete_ids, user=user).delete()

        messages.success(request, "User information updated.")
        return redirect('user_detail', user_id=user.id)

    return render(request, 'user_detail.html', {
        'user_obj': user,
        'transactions': transactions
    })



def view_profile(request, user_id):
    user_obj = get_object_or_404(User, pk=user_id)
    profile, _ = Profile.objects.get_or_create(user=user_obj)
    transactions = user_obj.transactions.all().order_by('-date')

    return render(request, 'user_detail.html', {
        'user_obj': user_obj,
        'profile': profile,
        'transactions': transactions,
    })

@login_required
def dashboard(request):
    if request.user.is_staff or request.user.is_superuser:
        return HttpResponse("Access denied. This page is for customers only.", status=403)

    user = request.user
    profile, _ = Profile.objects.get_or_create(user=user)
    transactions = Transaction.objects.filter(user=user).order_by('-created_at')

    orders = Order.objects.all()

    return render(request, 'dashboard.html', {
        'user': user,
        'profile': profile,
        'transactions': transactions,
        'orders': orders,
    })

@login_required
def user_profile(request):
    user = request.user

    # Restrict access for superusers
    if user.is_superuser:
        return HttpResponse("Access denied", status=403)

    profile, _ = Profile.objects.get_or_create(user=user)

    if request.method == 'POST':
        user.first_name = request.POST.get('first_name', '').strip()
        user.last_name = request.POST.get('last_name', '').strip()
        user.email = request.POST.get('email', '').strip()
        user.save()

        profile.contact_number = request.POST.get('contact_number', '').strip()
        profile.address = request.POST.get('address', '').strip()
        profile.position = request.POST.get('position', '').strip()
        profile.save()

        return redirect('view_profile')

    return render(request, 'user_profile.html', {
        'user_obj': user,
        'profile': profile
    })

@login_required
def transaction_history(request):
    transactions = Transaction.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'dashboard.html', {
        'transactions': transactions
    })

@login_required
def submit_order(request):
    if request.method == 'POST':
        cart_items = request.POST.get('cart_items', '').strip()
        total_price = request.POST.get('total_price', '').strip()

        # Validate cart_items and total_price
        if not cart_items or cart_items == '[]' or not total_price or float(total_price) <= 0:
            messages.error(request, "Your cart is empty or invalid. Please add items before creating a transaction.")
            return redirect('dashboard')

        try:
            # Parse cart_items into a Python object
            cart_items = json.loads(cart_items)

            # Ensure cart_items is a list of dictionaries
            if not isinstance(cart_items, list):
                raise ValueError("Invalid cart_items format. Expected a list of dictionaries.")

            # Extract the package name from the first item in the cart
            package_name = cart_items[0]['name'] if cart_items else "Unnamed Package"

            # Create a transaction entry
            Transaction.objects.create(
                user=request.user,
                items=json.dumps(cart_items),  # Store cart items as a JSON string
                total_price=total_price,
                status='pending',  # Default status
                package_name=package_name,  # Use the package name from the cart
            )

            messages.success(request, "Transaction created successfully!")
            return redirect('dashboard')

        except json.JSONDecodeError:
            messages.error(request, "Invalid JSON format in cart_items.")
            return redirect('dashboard')
        except (ValueError, KeyError) as e:
            messages.error(request, f"Invalid cart data: {e}")
            return redirect('dashboard')

    return redirect('dashboard')
    
@login_required
def staff_page(request):
    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponse("Access denied", status=403)

    users = User.objects.exclude(username='admin')
    return render(request, 'staff_page.html', {'users': users})

@login_required
def admin_order(request):
    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponse("Access denied", status=403)

    # Fetch items from the database
    main_dishes = Item.objects.filter(category='main_dish')
    rice = Item.objects.filter(category='rice')
    beverages = Item.objects.filter(category='beverage')

    if request.method == 'POST' and 'selected_orders' in request.POST:
        selected_ids = request.POST.getlist('selected_orders')
        Order.objects.filter(id__in=selected_ids, created_by=request.user).delete()
        messages.success(request, "Selected orders deleted successfully.")
        return redirect('admin_order')

    if request.method == 'POST' and 'create_order' in request.POST:
        package_name = request.POST.get('package_name', '').strip()
        if not package_name:
            messages.error(request, "Order name is required.")
            return redirect('admin_order')

        order = Order.objects.create(created_by=request.user, name=package_name)

        # Process items from the form
        all_items = main_dishes | rice | beverages
        for item in all_items:
            quantity = int(request.POST.get(f'{item.item_id}_qty', 0))
            if quantity > 0:
                OrderItem.objects.create(
                    order=order,
                    name=item.name,
                    quantity=quantity,
                    unit_price=item.price
                )

        order.calculate_total_price()

        messages.success(request, "Order successfully created.")
        return redirect('admin_order')

    # Fetch orders based on user role
    if request.user.is_superuser or request.user.is_staff:
        orders = Order.objects.all().order_by('-created_at')
    else:
        orders = Order.objects.filter(created_by=request.user).order_by('-created_at')

    return render(request, 'admin_order.html', {
        'main_dishes': main_dishes,
        'rice': rice,
        'beverages': beverages,
        'orders': orders,
    })

@login_required
@never_cache
def users_json(request):
    if not (request.user.is_superuser):
        return JsonResponse({'error': 'Access denied'}, status=403)

    users = User.objects.exclude(username__iexact='admin').values('id', 'username', 'is_staff', 'is_superuser')
    return JsonResponse(list(users), safe=False)

@login_required
def items_json(request):
    if not (request.user.is_superuser):
        return JsonResponse({'error': 'Access denied'}, status=403)
    
    items = Item.objects.all().values('id', 'name', 'item_id', 'price', 'category')
    return JsonResponse(list(items), safe=False)
