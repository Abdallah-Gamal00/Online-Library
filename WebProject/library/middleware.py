from django.shortcuts import redirect
from django.urls import reverse
from django.contrib import messages

class AdminAccessMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the URL path starts with /admin/
        if request.path.startswith('/admin/'):
            # If user is not authenticated or not staff, redirect to home
            if not request.user.is_authenticated or not request.user.is_staff:
                messages.error(request, 'You do not have permission to access the admin area.')
                return redirect('home')
        
        response = self.get_response(request)
        return response 