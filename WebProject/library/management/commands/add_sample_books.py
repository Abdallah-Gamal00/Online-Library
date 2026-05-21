from django.core.management.base import BaseCommand
from library.models import Book

class Command(BaseCommand):
    help = 'Adds sample books to the database'

    def handle(self, *args, **kwargs):
        sample_books = [
            {
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'category': 'Fiction',
                'description': 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
                'availability': 'Available'
            },
            {
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'category': 'Fiction',
                'description': 'The story of racial injustice and the loss of innocence in the American South.',
                'availability': 'Available'
            },
            {
                'title': '1984',
                'author': 'George Orwell',
                'category': 'Fiction',
                'description': 'A dystopian social science fiction novel and cautionary tale.',
                'availability': 'Available'
            },
            {
                'title': 'The Hobbit',
                'author': 'J.R.R. Tolkien',
                'category': 'Fiction',
                'description': 'A fantasy novel about the adventures of Bilbo Baggins.',
                'availability': 'Available'
            }
        ]

        for book_data in sample_books:
            Book.objects.get_or_create(
                title=book_data['title'],
                defaults=book_data
            )

        self.stdout.write(self.style.SUCCESS('Successfully added sample books')) 