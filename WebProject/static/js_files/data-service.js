// Data service for managing books and users in local storage

// Initialize default data if not exists
function initializeData() {
  // Initialize books if not exists
  if (!localStorage.getItem("books")) {
    const defaultBooks = [
      {
        id: 1,
        title: "قضية ست الحسن",
        author: "ميرنا المهدي",
        category: "Fiction",
        description: "رواية تحقيقات نور الألفي",
        image: "books/1.jpg",
        availability: "Available",
      },
      {
        id: 2,
        title: "الوحش الذي يمكن أن يكون لطيفا",
        author: "أحمد خالد توفيق",
        category: "Fiction",
        description: "قصة عن الوحش الذي يمكن أن يكون لطيفا من وجهة نظرات الخيالية والواقع",
        image: "books/2.jpg",
        availability: "Available",
      },
      {
        id: 3,
        title: "Atomic Habits & The Psychology of Money",
        author: "James Clear & Morgan Housel",
        category: "Self-Help",
        description: "Two bestselling books on building good habits and understanding the psychology of money.",
        image: "books/3.jpg",
        availability: "Available",
      },
      {
        id: 4,
        title: "الأب الغني الأب الفقير",
        author: "روبرت كيوساكي",
        category: "Finance",
        description: "كتاب يعلمك الذكاء المالي وكيفية بناء الثروة من خلال الاستثمار",
        image: "books/4.jpg",
        availability: "Available",
      },
      {
        id: 5,
        title: "سيكولوجية الجماهير",
        author: "غوستاف لوبون",
        category: "Psychology",
        description: "دراسة في علم النفس الاجتماعي وسلوك الجماعات",
        image: "books/5.jpg",
        availability: "Available",
      },
      {
        id: 6,
        title: "عقدك النفسية سجنك الأبدي",
        author: "د. يوسف الحسيني",
        category: "Psychology",
        description: "كتاب يتناول العقد النفسية وتأثيرها على حياة الإنسان",
        image: "books/6.jpg",
        availability: "Available",
      },
      {
        id: 7,
        title: "الهول",
        author: "أحمد خالد توفيق",
        category: "Horror",
        description: "رواية رعب من تأليف الكاتب المصري أحمد خالد توفيق",
        image: "books/7.jpg",
        availability: "Available",
      },
      {
        id: 8,
        title: "لا تكن لطيفا أكثر من اللازم",
        author: "ديوك روبنسون",
        category: "Self-Help",
        description: "كيف تتجنب تسعة أخطاء ضارة بك في التعامل مع الآخرين",
        image: "books/8.jpg",
        availability: "Available",
      },
      {
        id: 9,
        title: "قوة الفشل",
        author: "شارلز مانتز",
        category: "Self-Help",
        description: "27 طريقة لتحويل مشاكلك في الحياة إلى نجاحات حقيقية",
        image: "books/9.jpg",
        availability: "Available",
      },
      {
        id: 10,
        title: "فن اللامبالاة",
        author: "مارك مانسون",
        category: "Self-Help",
        description: "لعيش حياة تخالف المألوف - كتاب يساعدك على التركيز على ما هو مهم حقًا",
        image: "books/10.jpg",
        availability: "Available",
      },
      {
        id: 11,
        title: "جلسات نفسية",
        author: "د. محمد إبراهيم",
        category: "Psychology",
        description: "كتاب يقدم جلسات نفسية للوصول إلى السكينة النفسية",
        image: "books/11.jpg",
        availability: "Available",
      },
      {
        id: 12,
        title: "ما وراء الطبيعة",
        author: "د. أحمد خالد توفيق",
        category: "Horror",
        description: "سلسلة قصص رعب شهيرة من تأليف الكاتب المصري أحمد خالد توفيق",
        image: "books/12.jpg",
        availability: "Available",
      },
      {
        id: 13,
        title: "12 Rules for Life",
        author: "Jordan B. Peterson",
        category: "Self-Help",
        description: "An Antidote to Chaos - A guide to finding meaning in life and improving oneself",
        image: "books/13.jpg",
        availability: "Available",
      },
      {
        id: 14,
        title: "كليلة ودمنة",
        author: "عبد الله بن المقفع",
        category: "Classic",
        description: "كتاب من التراث العربي يحتوي على قصص وحكم على لسان الحيوانات",
        image: "books/14.jpg",
        availability: "Available",
      },
      {
        id: 15,
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        description: "A dystopian social science fiction novel that examines the consequences of totalitarianism",
        image: "books/15.jpg",
        availability: "Available",
      },
    ]
    localStorage.setItem("books", JSON.stringify(defaultBooks))
  }

  // Initialize users if not exists
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      {
        username: "admin",
        password: "admin123",
        email: "admin@library.com",
        role: "admin",
      },
      {
        username: "user",
        password: "user123",
        email: "user@example.com",
        role: "user",
      },
    ]
    localStorage.setItem("users", JSON.stringify(defaultUsers))
  }
}

// Book functions
function getAllBooks() {
  return JSON.parse(localStorage.getItem("books")) || []
}

function getBookById(id) {
  const books = getAllBooks()
  return books.find((book) => book.id === Number.parseInt(id))
}

function addBook(book) {
  const books = getAllBooks()
  // Generate new ID (max ID + 1)
  const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1
  book.id = newId
  books.push(book)
  localStorage.setItem("books", JSON.stringify(books))
  return book
}

function updateBook(updatedBook) {
  const books = getAllBooks()
  const index = books.findIndex((book) => book.id === Number.parseInt(updatedBook.id))
  if (index !== -1) {
    books[index] = updatedBook
    localStorage.setItem("books", JSON.stringify(books))
    return true
  }
  return false
}

function deleteBook(id) {
  const books = getAllBooks()
  const filteredBooks = books.filter((book) => book.id !== Number.parseInt(id))
  if (filteredBooks.length < books.length) {
    localStorage.setItem("books", JSON.stringify(filteredBooks))
    return true
  }
  return false
}

function searchBooks(query) {
  if (!query) return getAllBooks()

  query = query.toLowerCase()
  const books = getAllBooks()
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query),
  )
}

function getBooksByCategory() {
  const books = getAllBooks()
  const categories = {}

  books.forEach((book) => {
    if (!categories[book.category]) {
      categories[book.category] = 0
    }
    categories[book.category]++
  })

  return categories
}

// User functions
function getAllUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}

function getUserByUsername(username) {
  const users = getAllUsers()
  return users.find((user) => user.username === username)
}

function addUser(user) {
  const users = getAllUsers()
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
  return user
}

// Initialize data when the script loads
initializeData()

// Export functions
window.dataService = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
  getBooksByCategory,
  getAllUsers,
  getUserByUsername,
  addUser,
}
