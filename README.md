# Blossom Bookstore – Full-Stack Web Application

A full-stack bookstore web application featuring authentication, role-based access control, external API integration, and Stripe payment flow.

---

## Project Overview

Blossom Bookstore is a full-stack web application developed to demonstrate practical backend and frontend development skills.  
The application allows users to browse books, manage their accounts, place orders, and complete payments, while administrators can manage users through a protected admin panel.

This project was originally developed as an academic assignment and later extended and refined for portfolio and professional use.

---

## Features

### Authentication & Authorization
- User registration and login system
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (User / Admin)
- Protected routes for authenticated users only

### Book Store Functionality
- Book catalog fetched from an external API
- Search and sorting by title, author, and price
- Wishlist and shopping cart functionality
- Cart and wishlist persistence using local storage

### Orders & Payments
- Secure payment flow using Stripe Checkout
- Orders saved after successful payment
- User-specific order history

### Admin Panel
- Admin-only access panel
- View all registered users
- Delete users with role-based protection

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database & Services
- Firebase Firestore (database)
- Firebase Authentication
- Stripe API (payments)

### Security
- Environment variables for sensitive configuration
- Helmet for Content Security Policy (CSP)
- Rate limiting to prevent abuse

---

##

## Application Overview

### Home Page

Main landing page introducing the application and highlighting key features.

<!-- Add home page screenshot here -->
<img width="1920" height="993" src="https://github.com/user-attachments/assets/12147f15-96e1-49f2-8906-e212daac0399" />

<img width="1920" height="994" src="https://github.com/user-attachments/assets/939a7b96-074c-40d3-9a5f-0eee468453bb" />

---

### Book Store / Catalog

Users can browse items fetched from an external API, search by title or author, and sort results by price or name.

<!-- Add catalog screenshots here -->
<img width="1920" height="1005" src="https://github.com/user-attachments/assets/22859c5f-05b0-4bf6-9c2b-9011e7b127ec" />

<img width="936" height="666" src="https://github.com/user-attachments/assets/07f78cb8-303f-41f7-9691-067ebc5ee9b4" />

<img width="1899" height="995" src="https://github.com/user-attachments/assets/6537ed35-d983-459a-83ba-6b4be80be9e0" />

---

### Wishlist & Cart

Users can add items to their wishlist or shopping cart.  
Wishlist and cart data are preserved across sessions.

<!-- Add wishlist & cart screenshots here -->
<img width="863" height="1007" src="https://github.com/user-attachments/assets/45ee04ae-e4d1-45fe-b518-16df55563109" />

<img width="1920" height="1011" src="https://github.com/user-attachments/assets/69c75b24-633a-4972-8693-a8ae4482ca8b" />

---

### Stripe Checkout

Secure payment flow handled via Stripe Checkout.  
After successful payment, orders are stored and visible in the user’s account.

<!-- Add Stripe checkout screenshot here -->
<img width="1920" height="1010" src="https://github.com/user-attachments/assets/0c2cf9cc-d411-4793-ace4-2c09ba0c38f5" />

---

### Admin Panel

Admin-only panel displaying registered users with the ability to delete users.  
Access is restricted based on user roles.

<!-- Add admin panel screenshots here -->
<img width="1920" height="322" src="https://github.com/user-attachments/assets/3f499242-f3cd-4558-8550-b240bec5e788" />

<img width="1920" height="984" src="https://github.com/user-attachments/assets/adfa5136-fdc9-43ad-ad90-f160678d1b76" />

---

## Security Notes

- Environment variables are used for sensitive configuration
- Firebase service credentials and Stripe secret keys are excluded from the repository
- Helmet is used to enforce Content Security Policy (CSP)
- Rate limiting is enabled to prevent abuse

---

## Setup & Run Locally

```bash
npm install
node app.js
