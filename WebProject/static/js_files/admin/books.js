document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as admin
  const loggedIn = sessionStorage.getItem("loggedIn") === "true"
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))

  if (!loggedIn || !currentUser || currentUser.role !== "admin") {
    alert("You must be logged in as an admin to access this page.")
    window.location.href = "../log-in.html"
    return
  }

  // Get elements
  const booksTableBody = document.querySelector("#books-table tbody")
  const searchInput = document.querySelector(".search-input")
  const searchButton = document.querySelector(".search-button")

  // Load books
  function loadBooks(books) {
    // Clear the table
    booksTableBody.innerHTML = ""

    if (books.length === 0) {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td colspan="6" style="text-align: center;">No books found</td>
      `
      booksTableBody.appendChild(row)
      return
    }

    // Add book rows
    books.forEach((book) => {
      const row = document.createElement("tr")

      // Truncate description if too long
      const shortDescription =
        book.description.length > 50 ? book.description.substring(0, 50) + "..." : book.description

      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${shortDescription}</td>
        <td class="action-buttons">
          <a href="edit-book.html?id=${book.id}" class="btn-edit">Edit</a>
          <a href="delete-book.html?id=${book.id}" class="btn-delete">Delete</a>
        </td>
      `
      booksTableBody.appendChild(row)
    })
  }

  // Handle search
  function handleSearch() {
    const query = searchInput.value.trim()
    const filteredBooks = window.dataService.searchBooks(query)
    loadBooks(filteredBooks)
  }

  // Add event listeners
  searchButton.addEventListener("click", handleSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  })

  // Initial load of all books
  loadBooks(window.dataService.getAllBooks())
})
