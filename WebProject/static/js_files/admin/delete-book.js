document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as admin
  const loggedIn = sessionStorage.getItem("loggedIn") === "true"
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))

  if (!loggedIn || !currentUser || currentUser.role !== "admin") {
    alert("You must be logged in as an admin to access this page.")
    window.location.href = "../log-in.html"
    return
  }

  // Get book ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const bookId = urlParams.get("id")

  if (!bookId) {
    alert("No book ID specified")
    window.location.href = "books.html"
    return
  }

  // Get book data
  const book = window.dataService.getBookById(bookId)

  if (!book) {
    alert("Book not found")
    window.location.href = "books.html"
    return
  }

  // Fill book details
  document.getElementById("book-id").textContent = book.id
  document.getElementById("book-title").textContent = book.title
  document.getElementById("book-author").textContent = book.author
  document.getElementById("book-category").textContent = book.category

  // Handle delete button
  const deleteForm = document.getElementById("delete-form")

  deleteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Delete book from storage
    const success = window.dataService.deleteBook(bookId)

    if (success) {
      alert("Book deleted successfully!")
      window.location.href = "books.html"
    } else {
      alert("Error deleting book")
    }
  })
})
