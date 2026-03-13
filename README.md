# AUfoodieco: Self-Service Canteen Ordering System

AUfoodieco is a self-service canteen ordering system developed for Arellano University Juan Sumulong Campus. It replaces slow manual queuing with a fast, touch-based ordering experience inspired by modern fast-food kiosks.

## Features

* Browse and filter menu items by category (Meals, Snacks, Drinks)
* Add items to cart with a single tap
* Live cart display with total price
* Search functionality
* Minimal alerts and confirmations
* Staff can view and update orders by status (New, Preparing, Ready)
* Display order details including item list and total
* Onboarding & Authentication: Login, Register, and optional guest browsing
* Customer/User Side Processes:

  * Browse food items / Menu exploration
  * Order food and add to cart
  * Review order contents, quantities, totals
  * Checkout and choose payment method: Cash, Card, Digital Wallet / QR Code
  * Track orders in real-time
  * View order history / receipts
  * Profile management and wallet balance
* Admin / Staff Side Processes:

  * Dashboard with analytics and charts (revenue, orders over time)
  * User management (view, edit, block, order details)
  * Real-time order monitoring
  * Orders history for past/completed orders

## Technology Stack

* HTML
* CSS
* JavaScript
* LocalStorage for simulated cart and orders
* Firebase for future real-time data integration

## User Flow

### Student Ordering / Customer Flow

1. Landing page and authentication (Login / Register / Guest)
2. Browse homepage / menu page
3. Select items and add to cart
4. Review order and view total
5. Checkout and choose payment method (Cash / Card / Digital Wallet / QR Code)
6. Track order status in real-time
7. View past orders and receipts
8. Manage profile and digital wallet balance

### Staff / Admin Flow

1. Login and access admin dashboard
2. Monitor real-time incoming orders
3. Update order status (New → Preparing → Ready)
4. View order history and past/completed orders
5. Manage users (view, edit, block, order details)
6. View analytics and charts for revenue, orders over time


## Demo

* Live Prototype: [AUfoodieco Live](https://aufoodieco.vercel.app)
* Figma Prototype: [AUfoodieco Figma](https://www.figma.com/proto/bIIH4QvtG49f72s6JJvDm2/HCI---UI-DESIGN)

## Future Improvements

* Integrate Firebase backend for live order tracking
* Add digital payment functionality
* Conduct accessibility audit (WCAG/Section 508)
* Analytics dashboard for orders and inventory
* Push notifications for ready orders

## Contributors

* AUfoodieco Team – Arellano University Juan Sumulong Campus
