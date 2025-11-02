# How to Access Admin Panel

## Step-by-Step Login Instructions:

1. **Open the Login Page** - Make sure you're on `login.html`

2. **Select "Sign In" Tab** - Make sure the "Sign In" tab is selected (not "Sign Up")

3. **Click the "Admin" Button** - IMPORTANT: You must click the orange "Admin" button (not "User")
   - The Admin button should turn orange/active
   - This changes the login role to "admin"

4. **Enter Credentials:**
   - **Username:** `admin`
   - **Password:** `fuel2025`

5. **Click "Sign In"** - The orange "Sign In" button at the bottom

6. **You should be redirected** to the admin panel automatically

## Default Admin Credentials:
- **Username:** `admin`
- **Password:** `fuel2025`
- **Role:** Admin (make sure you click the Admin button!)

## Troubleshooting:

If login doesn't work:
1. Open browser console (F12) and check for errors
2. Make sure you clicked the "Admin" button (it should be highlighted/orange)
3. Make sure "Sign In" tab is selected (not "Sign Up")
4. Check that username is exactly: `admin` (lowercase, no spaces)
5. Check that password is exactly: `fuel2025` (no spaces)
6. Try clearing browser cache and localStorage, then refresh

## Quick Test:
Open browser console (F12) and type:
```javascript
localStorage.setItem('adminLoggedIn', 'true');
localStorage.setItem('bf_current_user', JSON.stringify({username: 'admin', role: 'admin'}));
window.location.href = 'admin.html';
```

This will bypass the login (only for testing purposes).

