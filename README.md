<div align="center">
  <img src="https://img.icons8.com/color/96/000000/5-star-hotel.png" alt="Hotel Logo">
  <h1>🏨 LuxuryStay Hospitality - Hotel Management System (HMS)</h1>
  <p><strong>A Modern, Full-Stack MERN Application for Digitizing Hotel Operations</strong></p>

  <p>
    <a href="https://luxurystay-hms-frontend.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-Click_Here-blue?style=for-the-badge" alt="Live Demo">
    </a>
  </p>
</div>

---

## 🌟 About The Project
LuxuryStay is a comprehensive Hotel Management System built to streamline daily hotel operations. It provides a seamless **Guest Booking Portal** and a powerful **Administrative & Staff Dashboard** to manage rooms, monitor revenue, assign maintenance tasks, and control system policies.

---

## 🚀 Live Demo & API Links

- **🌍 Live Website (Frontend):** [LuxuryStay Web App](https://luxurystay-hms-frontend.vercel.app/) *(Please update this link if your Vercel frontend URL is different)*
- **⚙️ Live API (Backend):** [LuxuryStay Express API](https://luxurystay-hms-backend-olive.vercel.app/api)

---

## ✨ Key Features

### 👨‍💼 Admin Dashboard
* **Real-time Analytics:** Visualizes revenue, bookings, and occupancy rates via interactive charts (Recharts).
* **Room Management:** Complete CRUD functionality for room inventory with dynamic pricing and Cloudinary image uploads.
* **Reservation Control:** Approve, modify, or cancel guest bookings instantly.
* **Staff & Task Management:** Register hotel employees, assign shifts, and delegate housekeeping/maintenance tasks.

### 🧹 Staff Portal (Housekeeping & Maintenance)
* **Task Tracking:** View personalized, real-time lists of assigned cleaning or repair duties.
* **Dynamic Status Updates:** Update task progress (Pending ➔ In Progress ➔ Resolved).

### 🛎️ Guest Portal
* **Seamless Room Booking:** Search available rooms with real-time date conflict prevention.
* **User Dashboard:** Track booking history, download invoices, and manage profiles securely.
* **Authentication:** Robust JWT-based login and registration system with password encryption (bcrypt).

---

## 💻 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Vite, Recharts, SweetAlert2
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **Cloud Storage:** Cloudinary API

---

## 🛠️ Local Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or Local)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Hamza-998/LuxuryStay-HMS--MERN-STACK-.git
cd LuxuryStay-HMS--MERN-STACK-
```

### 2. Backend Setup
```bash
# Install dependencies
npm install

# Create a .env file in the root and add your keys:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Start the server
npm start
```

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to the frontend folder
cd views/luxury-stay-frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 👥 Project Team (Final Year Project)
- **Muhammad Hamza** (Team Lead)
- **Shariq Mehmmod**

> **Academic Note:** This project was developed as a Final Year Project for Aptech Computer Education under the supervision of Sir Faisal Khan (Session 2026).
