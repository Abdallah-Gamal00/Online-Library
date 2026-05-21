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
  const categoryTableBody = document.querySelector("#category-stats tbody")
  const recentBooksTableBody = document.querySelector("#recent-books tbody")

  // Load category statistics
  function loadCategoryStats() {
    const books = window.dataService.getAllBooks()
    const categories = window.dataService.getBooksByCategory()

    // Clear the table
    categoryTableBody.innerHTML = ""

    // Add total books row
    const totalRow = document.createElement("tr")
    totalRow.innerHTML = `
      <td>Total Books</td>
      <td>${books.length}</td>
    `
    categoryTableBody.appendChild(totalRow)

    // Add category rows
    for (const category in categories) {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${category}</td>
        <td>${categories[category]}</td>
      `
      categoryTableBody.appendChild(row)
    }
  }

  // Load recent books
  function loadRecentBooks() {
    const books = window.dataService.getAllBooks()

    // Sort books by ID in descending order (assuming higher ID = more recent)
    const recentBooks = [...books].sort((a, b) => b.id - a.id).slice(0, 3)

    // Clear the table
    recentBooksTableBody.innerHTML = ""

    // Add book rows
    recentBooks.forEach((book) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td class="action-buttons">
          <a href="edit-book.html?id=${book.id}" class="btn-edit">Edit</a>
          <a href="delete-book.html?id=${book.id}" class="btn-delete">Delete</a>
        </td>
      `
      recentBooksTableBody.appendChild(row)
    })
  }

  // Load data
  loadCategoryStats()
  loadRecentBooks()
})
