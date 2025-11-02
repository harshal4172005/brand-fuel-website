# Brand Fuel Website

A modern, responsive website for Brand Fuel with user and admin functionality.

## Quick Start

1. Clone or download this repository
2. Start a local server (any of these methods):
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (requires http-server)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```
3. Open your browser and navigate to `http://localhost:8000`

## Features

- Responsive design optimized for all devices
- User authentication system
- Admin panel for content management
- Dynamic content loading
- Customizable site configuration

## Authentication

### Admin Credentials
- Username: admin
- Password: fuel2025

### User Access
- Users can create accounts through the sign-up form
- Regular users can browse all pages
- Admin users can access the admin panel and make site changes

## Admin Panel Features

- Edit hero section content
- Update CTA text
- Change site logo
- Live preview of changes
- Secure admin-only access

## Project Structure

- `index.html` - Main homepage
- `admin.html` - Admin control panel
- `login.html` - User/Admin authentication
- `services.html` - Services page
- `work.html` - Portfolio/Work page
- `testimonials.html` - Client testimonials
- `assets/` - Images and other static assets

## Testing

Run the smoke tests by opening `test.html` in your browser and checking the console output.