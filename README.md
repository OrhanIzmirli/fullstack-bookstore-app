Fullstack Bookstore Web Application

A full-stack bookstore web application built with Node.js and Firebase, featuring authentication, role based access control, Stripe payments, and external API integration.

This project was developed as a complete end to end web application demonstrating backend architecture, security practices, and real world integrations commonly used in production systems.

Features

User authentication with email/password

OAuth login using Google and Facebook

Role based access control (Admin / User)

Admin panel for user management (delete users)

Book catalog fetched dynamically from Open Library API

Shopping cart and wishlist functionality

Secure payments using Stripe Checkout

Order persistence after successful payment

Session handling with protected routes

Security middleware (Helmet, rate limiting, environment variables)

Tech Stack
Backend

Node.js

Express.js

Firebase Admin SDK

Firestore Database

JWT Authentication

Stripe API

Helmet (CSP & security headers)

Frontend

HTML5

CSS3

Vanilla JavaScript

External Services

Firebase Authentication

Firebase Firestore

Stripe Payments

Open Library API

Project Structure
.
├── controllers
│   ├── adminController.js
│   ├── authController.js
│   └── paymentController.js
├── models
│   ├── firebase.js
│   └── userModel.js
├── routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── paymentRoutes.js
├── utils
│   ├── authMiddleware.js
│   └── isAdmin.js
├── public
│   ├── admin.html
│   ├── shop.html
│   ├── login.html
│   ├── styles and scripts
│   └── images
├── app.js
├── package.json
└── README.md

Environment Variables

Create a .env file in the root directory:

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

STRIPE_SECRET_KEY=sk_test_your_key_here


A template is available in .env.example.

Installation & Run
npm install
node app.js


The application will be available at:

http://localhost:3000

Admin Access

To access the admin panel:

Log in with a user account

Set the user's role to admin in Firestore

Navigate to /admin

Non-admin users cannot access admin routes.

Screenshots
<img width="1920" height="995" alt="{60A19452-2060-4B3D-ABEC-2F8F3C1F8EB1}" src="https://github.com/user-attachments/assets/5605aa09-7fab-4208-85a3-4a03c11d746e" />

<img width="1920" height="984" alt="{D66DA880-14B9-4604-8801-3639E8CE7C10}" src="https://github.com/user-attachments/assets/14f50d2b-438d-4fa2-a5e1-c03ffe27fe58" />


Screenshots are available in the screenshots/ directory:

Shop page

Admin panel

Login page

Stripe checkout flow

<img width="1920" height="994" alt="{5F98ED9E-3E54-4397-822E-5F99EF95A92B}" src="https://github.com/user-attachments/assets/ca40940e-d0ea-49dd-86ce-e8d07bbfe89a" />


Security Notes

Sensitive credentials are stored in environment variables

Firebase service account files are excluded from version control

Rate limiting and Content Security Policy are enabled

Stripe test keys are used for development

License

This project is for educational and portfolio purposes.
