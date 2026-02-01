Fullstack Bookstore Web Application

A full-stack bookstore web application that allows users to browse books, manage wishlists and carts, place orders through Stripe, and provides an admin panel for user management.
The project demonstrates a complete client–server architecture with authentication, role-based access control, and third-party API integrations.

Features

User authentication with email/password

Google and Facebook login support

Persistent user sessions

Book catalog fetched from an external API (Open Library)

Search and sorting functionality

Wishlist and shopping cart management

Secure payments with Stripe

Order history for users

Admin panel with user management (delete users)

Protected routes for authenticated users and admins only

Tech Stack

Frontend

HTML, CSS, JavaScript

Responsive UI with dynamic components

LocalStorage for client-side state management

Backend

Node.js

Express.js

JWT-based authentication

Role-based authorization (Admin / User)

Database & Services

Firebase Firestore

Firebase Authentication

Stripe Payments

Open Library API

Application Overview
Home Page

Main landing page introducing the bookstore and highlighting featured books.

<img width="1920" height="993" alt="{3EAC56AE-12BD-48EA-BF39-D17EF648CCB5}" src="https://github.com/user-attachments/assets/12147f15-96e1-49f2-8906-e212daac0399" />

<img width="1920" height="994" alt="{5F98ED9E-3E54-4397-822E-5F99EF95A92B}" src="https://github.com/user-attachments/assets/939a7b96-074c-40d3-9a5f-0eee468453bb" />


Book Store / Catalog

Users can browse books fetched from an external API, search by title or author, and sort by price or name.

<img width="1920" height="1005" alt="{B09BF2C2-9B57-4754-9D4D-319A0F790F8B}" src="https://github.com/user-attachments/assets/22859c5f-05b0-4bf6-9c2b-9011e7b127ec" />
<img width="936" height="666" alt="{32E3DA17-558C-4F8B-9883-C444E4F04BEF}" src="https://github.com/user-attachments/assets/07f78cb8-303f-41f7-9691-067ebc5ee9b4" />
<img width="1899" height="995" alt="{7C453BE0-59DF-466D-922A-2074BDFF0D14}" src="https://github.com/user-attachments/assets/6537ed35-d983-459a-83ba-6b4be80be9e0" />


Wishlist & Cart

Users can add books to their wishlist or shopping cart.
The cart and wishlist are preserved across sessions.

<img width="863" height="1007" alt="{F7B630C4-A953-4062-B206-290B4946CF5F}" src="https://github.com/user-attachments/assets/45ee04ae-e4d1-45fe-b518-16df55563109" />

<img width="1920" height="1011" alt="{546EDBFA-B119-4F71-8E2F-8CD43D6F8F4D}" src="https://github.com/user-attachments/assets/69c75b24-633a-4972-8693-a8ae4482ca8b" />


Stripe Checkout

Secure payment flow handled via Stripe Checkout.
After successful payment, orders are stored and visible in the user’s account.

<img width="1920" height="1010" alt="{71CB48F9-5AB5-4481-A86D-A785159484AC}" src="https://github.com/user-attachments/assets/0c2cf9cc-d411-4793-ace4-2c09ba0c38f5" />


Admin Panel

Admin-only panel displaying registered users with the ability to delete users.
Access is restricted based on user roles.

<img width="1920" height="322" alt="{E3FFBD32-749B-40BB-AE9C-9BB9FD61A09F}" src="https://github.com/user-attachments/assets/3f499242-f3cd-4558-8550-b240bec5e788" />

<img width="1920" height="984" alt="{D66DA880-14B9-4604-8801-3639E8CE7C10}" src="https://github.com/user-attachments/assets/adfa5136-fdc9-43ad-ad90-f160678d1b76" />


Security Notes

Environment variables are used for sensitive keys

Firebase service credentials and Stripe secret keys are excluded from the repository

Helmet is used to enforce Content Security Policy (CSP)

Rate limiting is enabled to prevent abuse

Setup & Run Locally
npm install
node app.js


The application will run at:

http://localhost:3000


Create a .env file based on .env.example and provide your own Firebase and Stripe credentials.

Project Purpose

This project was developed as a full-stack web application to demonstrate:

Backend and frontend integration

Secure authentication and authorization

Real payment processing flow

Admin role management

Clean and maintainable project structure

It is suitable for portfolio, CV, and junior developer job applications.

Author

Orhan Izmirli
