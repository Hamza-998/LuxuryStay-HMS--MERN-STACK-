# LuxuryStay HMS - Hotel Management System

LuxuryStay is a comprehensive full-stack Hotel Management System built with the **MERN** stack (MongoDB, Express, React, Node.js). It provides a complete solution for managing hotel operations, reservations, staff, and maintenance, alongside a public-facing portal for guests.

## Features

### Public Portal (Guests)
- Browse available rooms and filter by type/capacity.
- View detailed room descriptions, pricing, and features.
- Make real-time reservations.

### Admin Dashboard (Management)
- **Analytics & KPIs:** View real-time revenue, occupancy rates, and pending check-ins/check-outs.
- **Room Management:** Add, edit, or delete rooms. Manage current room statuses (Available, Occupied, Maintenance).
- **Reservations Management:** View, update, and manage all guest bookings, track check-ins, check-outs, and payments.
- **Maintenance Operations:** Create and assign maintenance tasks to staff. Smart room availability handling (rooms can be marked "Out of Order" and automatically restored once issues are resolved).
- **Staff Management:** Manage hotel staff profiles, roles, and assignments.
- **User Management:** View guest profiles and user roles.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Recharts (for dashboard analytics)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hamza-998/LuxuryStay-HMS--MERN-STACK-.git
   ```

2. **Backend Setup:**
   - Navigate to the root directory.
   - Install dependencies: `npm install`
   - Create a `.env` file and configure your environment variables (MongoDB URI, JWT Secret, Port, Cloudinary configs, etc.).
   - Start the backend server: `npm start` or `node server.js`

3. **Frontend Setup:**
   - Navigate to the frontend directory: `cd views/luxury-stay-frontend`
   - Install dependencies: `npm install`
   - Start the development server: `npm run dev`

## Contribution
Designed and developed for seamless hotel operations and enhanced guest experience.
