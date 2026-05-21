// Authentication functions
const auth = {
    // Login function
    async login(username, password) {
        try {
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store user data in sessionStorage
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('currentUser', JSON.stringify(data.user));
                
                // Show success message
                showAlert('success', 'Login successful!');
                
                // Redirect based on user role
                if (data.user.is_staff) {
                    window.location.href = '/books/admin_panel/dashboard/';
                } else {
                    window.location.href = '/';
                }
            } else {
                showAlert('error', data.message || 'Login failed');
            }
        } catch (error) {
            showAlert('error', 'An error occurred during login');
            console.error('Login error:', error);
        }
    },

    // Signup function
    async signup(username, email, password1, password2, role) {
        try {
            const response = await fetch('/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    username,
                    email,
                    password1,
                    password2,
                    role
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store user data in sessionStorage
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('currentUser', JSON.stringify(data.user));
                
                // Show success message
                showAlert('success', 'Account created successfully!');
                
                // Redirect based on user role
                if (data.user.is_staff) {
                    window.location.href = '/books/admin_panel/dashboard/';
                } else {
                    window.location.href = '/';
                }
            } else {
                showAlert('error', data.message || 'Signup failed');
            }
        } catch (error) {
            showAlert('error', 'An error occurred during signup');
            console.error('Signup error:', error);
        }
    },

    // Logout function
    async logout() {
        try {
            const response = await fetch('/logout/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Clear session storage
                sessionStorage.removeItem('loggedIn');
                sessionStorage.removeItem('currentUser');
                
                // Show success message
                showAlert('success', 'Logged out successfully!');
                
                // Redirect to home
                window.location.href = '/';
            } else {
                showAlert('error', data.message || 'Logout failed');
            }
        } catch (error) {
            showAlert('error', 'An error occurred during logout');
            console.error('Logout error:', error);
        }
    }
};

// Helper function to show alerts
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add to page
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
} 