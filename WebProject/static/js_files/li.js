document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const username = document.getElementById("username")
      const password = document.getElementById("password")

      if (!username || !password || username.value.trim() === "" || password.value.trim() === "") {
        alert("Please fill out all fields!")
        return
      }

      const users = JSON.parse(localStorage.getItem("users")) || []
      const user = users.find((user) => user.username === username.value && user.password === password.value)

      if (user) {
        alert("Login successful!")
        sessionStorage.setItem("loggedIn", "true")
        sessionStorage.setItem("currentUser", JSON.stringify(user))

        if (user.role === "admin") {
          window.location.href = "admin/dashboard.html"
        } else {
          window.location.href = "home.html"
        }
      } else {
        alert("Invalid username or password.")
      }
    })
  }
})
