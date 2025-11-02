// auth.js - simple front-end auth using localStorage
(function(){
    const STORAGE_KEY = 'bf_users';
    const CURRENT_USER_KEY = 'bf_current_user';

    function getUsers(){
        try{
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        }catch(e){
            return [];
        }
    }
    function saveUsers(users){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    // Seed default admin if not present
    function seedAdmin(){
        const users = getUsers();
        if(!users.find(u => u.role === 'admin')){
            users.push({ username: 'admin', password: 'fuel2025', role: 'admin' });
            saveUsers(users);
        }
    }

    function signup(username, password, role, additionalData = {}){
        const users = getUsers();
        if(users.find(u => u.username === username && u.role === role)){
            return { ok: false, message: 'User already exists for this role.' };
        }
        const newUser = Object.assign({ username, password, role }, additionalData);
        users.push(newUser);
        saveUsers(users);
        return { ok: true };
    }

    function signin(username, password, role){
        const users = getUsers();
        const found = users.find(u => u.username === username && u.password === password && u.role === role);
        if(found){
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
            // Backwards-compatible flags used elsewhere
            if(found.role === 'admin') localStorage.setItem('adminLoggedIn', 'true');
            if(found.role === 'user') localStorage.setItem('userLoggedIn', 'true');
            return { ok: true };
        }
        return { ok: false, message: 'Invalid credentials.' };
    }

    function signout(){
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('userLoggedIn');
        window.location.href = 'login.html';
    }

    function getLoggedInUser(){
        try{
            return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
        }catch(e){ return null; }
    }

    // Page guard: check body[data-auth]
    function pageGuard(){
        const auth = document.body.getAttribute('data-auth') || 'any';
        if(auth === 'none') return; // allow
        const cur = getLoggedInUser();
        if(!cur){
            if (window.location.pathname.indexOf('login.html') === -1) {
                window.location.href = 'login.html';
            }
            return;
        }
        if(auth === 'admin' && cur.role !== 'admin'){
            window.location.href = 'login.html';
            return;
        }
    }

    // Expose functions globally
    window.BFAuth = {
        signup,
        signin,
        signout,
        getLoggedInUser
    };

    // Initialize
    seedAdmin();

    document.addEventListener('DOMContentLoaded', function(){
        pageGuard();
    });
})();