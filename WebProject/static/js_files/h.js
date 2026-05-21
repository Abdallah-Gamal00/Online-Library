document.addEventListener("DOMContentLoaded", () => {
  // Initialize data service if needed
  if (typeof window.dataService === "undefined") {
    // Load the data service script
    const script = document.createElement("script")
    script.src = "/static/js_files/data-service.js"
    script.onload = updateUI
    document.head.appendChild(script)
  } else {
    updateUI()
  }

  function updateUI() {
    const loginButton = document.querySelector(".log-in")
    const signupButton = document.querySelector(".sign-up")
    const logoutButton = document.querySelector(".log-out")
    const booksLink = document.querySelector("a[href='books.html']")
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))

    if (sessionStorage.getItem("loggedIn") === "true" && currentUser) {
      // User is logged in
      if (loginButton) loginButton.style.display = "none"
      if (signupButton) signupButton.style.display = "none"

      // Add admin dashboard link if user is admin
      if (currentUser.role === "admin" && booksLink) {
        const adminLink = document.createElement("li")
        adminLink.innerHTML = `<a href="admin/dashboard.html">Admin Dashboard</a>`
        booksLink.parentNode.insertAdjacentElement("afterend", adminLink)
      }
    } else {
      // User is not logged in
      if (logoutButton) logoutButton.style.display = "none"
    }
  }
})

function logout() {
  sessionStorage.removeItem("loggedIn")
  sessionStorage.removeItem("currentUser")
  alert("Logged out successfully!")
  window.location.href = "home.html"
}
