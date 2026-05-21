from django.db import models

# Create your models here.

class Book(models.Model):
    CATEGORY_CHOICES = [
        ('Fiction', 'Fiction'),
        ('Non-Fiction', 'Non-Fiction'),
        ('Science', 'Science'),
        ('History', 'History'),
        ('Biography', 'Biography'),
        ('Other', 'Other'),
    ]
    
    AVAILABILITY_CHOICES = [
        ('Available', 'Available'),
        ('Not Available', 'Not Available'),
    ]

    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to='books/', null=True, blank=True)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='Available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
