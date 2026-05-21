document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const username = document.getElementById("username")
      const password = document.getElementById("password")
      const confirmPassword = document.getElementById("confirm-password")
      const email = document.getElementById("email")
      const role = document.querySelector("input[name='role']:checked")

      if (!username || !password || !confirmPassword || !email || !role) {
        alert("Please fill out all fields!")
        return
      }

      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!")
        return
      }

      if (password.value.length < 6) {
        alert("Password must be at least 6 characters.")
        return
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(email.value)) {
        alert("Please enter a valid email address.")
        return
      }

      // Check if username already exists
      const existingUsers = JSON.parse(localStorage.getItem("users")) || []
      if (existingUsers.some((user) => user.username === username.value)) {
        alert("Username already exists. Please choose another one.")
        return
      }

      const newUser = {
        username: username.value,
        password: password.value,
        email: email.value,
        role: role.value,
      }

      existingUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(existingUsers))

      // Log in the new user
      sessionStorage.setItem("loggedIn", "true")
      sessionStorage.setItem("currentUser", JSON.stringify(newUser))

      alert("Sign up successful!")

      if (newUser.role === "admin") {
        window.location.href = "admin/dashboard.html"
      } else {
        window.location.href = "home.html"
      }
    })
  }
})
