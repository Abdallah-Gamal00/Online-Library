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

  // Fill form with book data
  document.getElementById("book-id").value = book.id
  document.getElementById("book-title").value = book.title
  document.getElementById("book-author").value = book.author
  document.getElementById("book-category").value = book.category
  document.getElementById("book-description").value = book.description
  document.getElementById("book-availability").value = book.availability

  // Get form element
  const form = document.querySelector("form")

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const title = document.getElementById("book-title").value.trim()
    const author = document.getElementById("book-author").value.trim()
    const category = document.getElementById("book-category").value
    const description = document.getElementById("book-description").value.trim()
    const availability = document.getElementById("book-availability").value

    // Validate form
    if (!title || !author || !category || !description) {
      alert("Please fill out all required fields")
      return
    }

    // Update book object
    const updatedBook = {
      id: Number.parseInt(bookId),
      title,
      author,
      category,
      description,
      image: book.image, // Keep the same image
      availability,
    }

    // Update book in storage
    const success = window.dataService.updateBook(updatedBook)

    if (success) {
      alert("Book updated successfully!")
      window.location.href = "books.html"
    } else {
      alert("Error updating book")
    }
  })
})
