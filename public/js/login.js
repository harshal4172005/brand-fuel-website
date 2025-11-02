// Simple login functionality (in production, use proper authentication)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple check (replace with real auth in production)
        if (username === 'admin' && password === 'fuel2025') {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            errorMessage.textContent = 'Invalid credentials. Please try again.';
        }
    });
});
