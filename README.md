# AUfoodieco: Self-Service Canteen Ordering System

AUfoodieco is a self-service canteen ordering system developed for **Arellano University Juan Sumulong Campus**. It replaces slow manual queuing with a fast, touch-based ordering experience inspired by modern fast-food kiosks.

---

## Features

### Menu and Ordering

* Browse and filter menu items
* Add to cart with real-time total
* Search functionality

### Order Management (Staff)

* View and update order status
* Monitor orders in real-time

### Authentication

* Login and Register
* Guest access (no session persistence)

### Customer Features

* Order food and manage cart
* Checkout with multiple payment methods
* Track orders in real-time
* View history, receipts, and profile
* Wallet system with expense tracking

### Admin Features

* Dashboard with analytics
* User, menu, and order management (CRUD)
* Revenue and order monitoring

---

## Technology Stack

* HTML
* CSS
* JavaScript (Vanilla)
* LocalStorage
* Firebase (planned)

---

## Project Structure

```
aufoodieco/
├── css/
├── data/
│   ├── complaint.json
│   ├── global.json
│   ├── help.json
│   ├── identity.json
│   └── recommend.json
├── imgs/
├── pages/
│   ├── admin/
│   │   ├── dashboard.html
│   │   ├── menu-management.html
│   │   ├── order-history.html
│   │   ├── order-management.html
│   │   └── user-management.html
│   ├── developers.html
│   ├── features.html
│   ├── homepage.html
│   ├── orders.html
│   ├── profile.html
│   └── wallet.html
├── script/
│   ├── admin/
│   ├── config/
│   └── modules/
│       ├── ai/
│       ├── api/
│       ├── auth/
│       ├── cart/
│       ├── food/
│       ├── lib/
│       ├── profile/
│       ├── utils/
│       └── wallet/
├── app.js
├── main.js
├── index.html
├── README.md
├── robots.txt
└── sitemap.xml
```

---

## User Flow

### Customer Flow

1. Login / Register / Guest
2. Browse menu and add to cart
3. Checkout and select payment
4. Track orders
5. View history and manage profile

### Admin Flow

1. Login to dashboard
2. Monitor and update orders
3. Manage users and menu
4. View reports and analytics

---

* HTML
* CSS
* JavaScript (Vanilla)
* LocalStorage (for simulation of cart, orders, and sessions)
* Firebase (planned for real-time database integration)

---

## User Flow

### Customer Flow

1. Login / Register / Continue as Guest
2. Browse homepage and menu
3. Add items to cart
4. Review cart and total
5. Checkout and select payment method
6. Track order status in real-time
7. View order history and receipts
8. Manage profile and wallet
9. Analyze spending via charts

### Admin Flow

1. Login to admin dashboard
2. Monitor incoming orders
3. Update order status
4. Manage users (CRUD)
5. Manage menu items (CRUD)
6. View order history
7. Analyze revenue and order trends

---

## Demo

* 🌐 Live Prototype: [https://aufoodieco.vercel.app](https://aufoodieco.vercel.app)
* 🎨 Figma Design: [https://www.figma.com/proto/bIIH4QvtG49f72s6JJvDm2/HCI---UI-DESIGN](https://www.figma.com/proto/bIIH4QvtG49f72s6JJvDm2/HCI---UI-DESIGN)

---

## Page Overview

### 1. Login Page

* Users can log in, register, or continue as a guest (guest session is not persisted)
  ![Login Page](./imgs/docs/1.png)

### 2. Register Page

* Allows new users to create an account
  ![Register Page](./imgs/docs/2.png)

### 3. System Features Page

* Displays system highlights and key functionalities
  ![System Features](./imgs/docs/3.png)

### 4. User Homepage / Ordering Page

* Main interface for browsing food and adding items to cart
  ![Homepage](./imgs/docs/4.png)

### 5. FoodieROI AI Recommendation

* Shows AI-based recommended food items
  ![AI Recommendation](./imgs/docs/5.png)

### 6. Review Order & Payment Selection

* Users review cart and choose payment method (GCash or Pay on Counter)
  ![Review Order](./imgs/docs/6.png)

### 7. GCash QR Payment

* Displays QR code for GCash payment transactions
  ![GCash Payment](./imgs/docs/7.png)

### 8. User Order Monitoring Page

* Displays order status sections: New, Preparing, Ready
  ![Order Monitoring](./imgs/docs/8.png)

### 9. Wallet Page

* Includes wallet balance, cash-in, QR scanner, expense tracking, and payment history
  ![Wallet Page](./imgs/docs/9.png)

### 10. Payment History / Digital Receipt

* Shows transaction history with downloadable receipts (PDF/JPG)
  ![Payment History](./imgs/docs/10.png)

### 11. User Profile Page

* Displays and allows editing of user basic information
  ![Profile Page](./imgs/docs/11.png)

### 12. Admin Dashboard

* Overview of orders, users, revenue, and analytics charts
  ![Admin Dashboard](./imgs/docs/12.png)

### 13. Admin Orders Page

* Admin can monitor and update order statuses
  ![Admin Orders](./imgs/docs/13.png)

### 14. Admin User Management

* Manage users with CRUD operations
  ![User Management](./imgs/docs/14.png)

### 15. Menu Management

* Manage menu items with CRUD functionality
  ![Menu Management](./imgs/docs/15.png)

### 16. Order History Management

* Manage and review completed orders
  ![Order History](./imgs/docs/16.png)

### 17. Mobile Responsive View (1)

* Mobile layout adaptation of the system
  ![Mobile 1](./imgs/docs/17.png)

### 18. Mobile Responsive View (2)

* Continued mobile responsiveness showcase
  ![Mobile 2](./imgs/docs/18.png)

### 19. Mobile Responsive View (3)

* Additional mobile interface screens
  ![Mobile 3](./imgs/docs/19.png)

### 20. Mobile Responsive View (4)

* Further mobile UI adjustments
  ![Mobile 4](./imgs/docs/20.png)


## Contributors

* AUfoodieco Team – Arellano University Juan Sumulong Campus
