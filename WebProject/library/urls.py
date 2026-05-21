from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('books/', views.get_all_books, name='books'),
    path('login/', views.login_page, name='login'),
    path('signup/', views.signup_page, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('books/admin_panel/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('books/admin_panel/books/', views.admin_books, name='admin_books'),
    path('books/admin_panel/add-book/', views.admin_add_book, name='admin_add_book'),
    path('books/admin_panel/<int:book_id>/edit/', views.admin_edit_book, name='admin_edit_book'),
    path('books/admin_panel/<int:book_id>/delete/', views.admin_delete_book, name='admin_delete_book'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
