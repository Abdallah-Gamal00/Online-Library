from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.contrib.auth.models import User
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.db.models import Count, Q
from .forms import BookForm
from .models import Book
from django.core.paginator import Paginator
from django.views.decorators.http import require_http_methods
import json

def home(request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            return redirect('admin_dashboard')
    return render(request, 'home.html')

def get_all_books(request):
    search_query = request.GET.get('search', '').strip()
    if search_query:
        books = Book.objects.filter(
            Q(title__icontains=search_query) |
            Q(author__icontains=search_query) |
            Q(category__icontains=search_query)
        ).distinct().order_by('-created_at')
    else:
        books = Book.objects.all().order_by('-created_at')
    
    return render(request, 'books.html', {'books': books})

def login_page(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '').strip()
            password = data.get('password', '')
            
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'success': True,
                    'user': {
                        'username': user.username,
                        'email': user.email,
                        'is_staff': user.is_staff
                    }
                })
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'Invalid username or password.'
                }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)
    else:
        # Handle GET request - show login form
        return render(request, 'log-in.html')

def signup_page(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '').strip()
            email = data.get('email', '').strip()
            password1 = data.get('password1', '')
            password2 = data.get('password2', '')
            role = data.get('role', 'user')

            # Validation
            if not username or not email or not password1 or not password2:
                return JsonResponse({
                    'success': False,
                    'message': 'All fields are required.'
                }, status=400)
            elif password1 != password2:
                return JsonResponse({
                    'success': False,
                    'message': 'Passwords do not match.'
                }, status=400)
            elif len(password1) < 6:
                return JsonResponse({
                    'success': False,
                    'message': 'Password must be at least 6 characters.'
                }, status=400)
            elif User.objects.filter(username=username).exists():
                return JsonResponse({
                    'success': False,
                    'message': 'Username already exists.'
                }, status=400)
            elif User.objects.filter(email=email).exists():
                return JsonResponse({
                    'success': False,
                    'message': 'Email already exists.'
                }, status=400)
            
            # Create user
            user = User.objects.create_user(username=username, email=email, password=password1)
            if role == 'admin':
                user.is_staff = True
                user.save()
            
            login(request, user)
            return JsonResponse({
                'success': True,
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff
                }
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)
    else:
        # Handle GET request - show signup form
        return render(request, 'sign-up.html')

@require_http_methods(["POST"])
def logout_view(request):
    if request.user.is_authenticated:
        username = request.user.username
        logout(request)
        return JsonResponse({
            'success': True,
            'message': f'Goodbye, {username}! You have been logged out successfully.'
        })
    return JsonResponse({
        'success': False,
        'message': 'You are not logged in.'
    }, status=400)

@login_required
@user_passes_test(lambda u: u.is_staff)
def admin_dashboard(request):
    try:
        # Get total number of books
        total_books = Book.objects.count()
        
        # Get category statistics with optimized query
        category_stats = Book.objects.values('category')\
            .annotate(count=Count('id'))\
            .order_by('-count')
        
        # Get recent books with select_related for better performance
        recent_books = Book.objects.all()\
            .order_by('-created_at')[:5]
        
        alert_message = request.session.pop('alert_message', None)
        
        return render(request, 'admin_panel/dashboard.html', {
            'total_books': total_books,
            'category_stats': category_stats,
            'recent_books': recent_books,
            'alert_message': alert_message
        })
    except Exception as e:
        messages.error(request, 'An error occurred while loading the dashboard.')
        return redirect('home')

@login_required
@user_passes_test(lambda u: u.is_staff)
def admin_books(request):
    try:
        books = Book.objects.all().order_by('-created_at')
        return render(request, 'admin_panel/books.html', {
            'books': books
        })
    except Exception as e:
        messages.error(request, 'An error occurred while loading books.')
        return redirect('admin_dashboard')

@login_required
@user_passes_test(lambda u: u.is_staff)
def admin_add_book(request):
    try:
        if request.method == 'POST':
            form = BookForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                request.session['alert_message'] = 'Book added successfully!'
                return redirect('admin_books')
        else:
            form = BookForm()
        
        return render(request, 'admin_panel/add-book.html', {
            'form': form,
            'title': 'Add New Book'
        })
    except Exception as e:
        messages.error(request, 'An error occurred while adding the book.')
        return redirect('admin_books')

@login_required
@user_passes_test(lambda u: u.is_staff)
def admin_delete_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        request.session['alert_message'] = 'Book deleted successfully!'
    except Book.DoesNotExist:
        messages.error(request, 'Book not found!')
    except Exception as e:
        messages.error(request, 'An error occurred while deleting the book.')
    return redirect('admin_books')

@login_required
@user_passes_test(lambda u: u.is_staff)
def admin_edit_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        if request.method == 'POST':
            form = BookForm(request.POST, request.FILES, instance=book)
            if form.is_valid():
                form.save()
                request.session['alert_message'] = 'Book updated successfully!'
                return redirect('admin_books')
        else:
            form = BookForm(instance=book)
        
        return render(request, 'admin_panel/add-book.html', {
            'form': form,
            'title': 'Edit Book'
        })
    except Book.DoesNotExist:
        messages.error(request, 'Book not found!')
        return redirect('admin_books')
    except Exception as e:
        messages.error(request, 'An error occurred while editing the book.')
        return redirect('admin_books')
