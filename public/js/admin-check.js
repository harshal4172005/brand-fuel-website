// Check if admin is logged in before loading admin panel
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}
