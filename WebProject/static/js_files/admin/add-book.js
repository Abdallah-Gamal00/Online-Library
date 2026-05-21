document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as admin
  const loggedIn = sessionStorage.getItem("loggedIn") === "true"
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))

  if (!loggedIn || !currentUser || currentUser.role !== "admin") {
    alert("You must be logged in as an admin to access this page.")
    window.location.href = "../log-in.html"
    return
  }

  const imageInput = document.getElementById('book-image');
  let base64Image = "";
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        base64Image = reader.result;
        previewContainer.innerHTML = `<img src="${reader.result}" alt="Preview">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Get form element
  const form = document.getElementById("book-form")

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const bookId = document.getElementById("book-id").value.trim()
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

    // Create new book object
    const newBook = {
      id: Number.parseInt(bookId) || null, // Will be assigned in addBook if null
      title,
      author,
      category,
      description,
      image: base64Image,
      availability,
    }

    // Add book to storage
    window.dataService.addBook(newBook)

    alert("Book added successfully!")
    window.location.href = "books.html"
  })
})
