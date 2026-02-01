# 📚 Fullstack Bookstore Web Application

A full-stack bookstore web application built with modern web technologies.  
The project includes authentication, role-based access control, admin panel, Stripe payments, and Firebase integration.

This project was developed as part of a university assignment and received the **highest grade**, meeting all required criteria and extending them with real-world features.

---

## 🚀 Features

- User registration and login
- Authentication with email/password
- Login via **Google** and **Facebook**
- Role-based access control (User / Admin)
- Admin panel to manage users
- Users can browse books fetched from an external API
- Shopping cart and wishlist functionality
- Secure checkout with **Stripe**
- Orders are saved after successful payment
- Session persistence using local storage
- Protected routes (unauthenticated users cannot access restricted pages)
- Responsive and user-friendly UI

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Firebase Authentication
- Firebase Firestore
- Stripe Checkout

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- Stripe API
- Helmet (Security / CSP)
- Express Rate Limit

### Database & Services
- Firebase Firestore
- Firebase Authentication
- Stripe Payments
- Open Library API (external books data)

---

## 🔐 Roles & Permissions

- **User**
  - Browse books
  - Add to cart & wishlist
  - Checkout and place orders
  - View order history

- **Admin**
  - Access admin panel
  - View all registered users
  - Delete users

---

## 📦 Installation & Setup (Local)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/fullstack-bookstore-app.git
cd fullstack-bookstore-app
