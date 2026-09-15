const fs = require('fs');
const pako = require('pako');

function encodeMermaid(graph) {
  const data = new TextEncoder().encode(graph);
  const compressed = pako.deflate(data, { level: 9 });
  const stringified = String.fromCharCode.apply(null, compressed);
  const encoded = Buffer.from(stringified, 'binary').toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_');
  return `https://mermaid.ink/img/pako:${encoded}`;
}

const sysArch = `graph TD\nClient[React Frontend] --> API[Express/Node.js API]\nAPI --> Auth[JWT Authentication]\nAPI --> DB[(MongoDB Atlas)]\nAPI --> Cloudinary[Cloudinary Storage]`;
const erd = `erDiagram\nUSER ||--o{ RESERVATION : makes\nROOM ||--o{ RESERVATION : booked_for\nROOM ||--o{ MAINTENANCETASK : requires\nSTAFF ||--o{ MAINTENANCETASK : assigned_to`;
const workflow = `sequenceDiagram\nGuest->>Frontend: Book Room\nFrontend->>API: POST /reservations\nAPI->>DB: Check Availability\nDB-->>API: Available\nAPI->>DB: Save Reservation\nAPI-->>Frontend: Success Response`;

const htmlString = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; }
        h1 { color: #1E3A8A; text-align: center; font-size: 38pt; margin-bottom: 10px; font-weight: bold; }
        h2.subtitle { color: #D97706; text-align: center; font-size: 24pt; margin-top: 0; margin-bottom: 50px; }
        h2.section-header { color: #1E3A8A; font-size: 18pt; border-bottom: 2px solid #D97706; padding-bottom: 5px; margin-top: 40px; }
        h3 { color: #374151; font-size: 14pt; margin-top: 25px; }
        p { font-size: 11pt; text-align: justify; margin-bottom: 15px; }
        .cover-page { text-align: center; margin-top: 150px; margin-bottom: 300px; }
        .cover-details { font-size: 14pt; margin-top: 100px; text-align: left; margin-left: 20%; border-left: 4px solid #1E3A8A; padding-left: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
        th { background-color: #1E3A8A; color: white; padding: 10px; text-align: left; font-size: 11pt; }
        td { border: 1px solid #D1D5DB; padding: 10px; font-size: 10pt; }
        .highlight { background-color: #F3F4F6; padding: 10px; border-left: 3px solid #D97706; margin-bottom: 15px; }
        .screenshot-box { border: 2px dashed #9CA3AF; padding: 40px; text-align: center; background-color: #F9FAFB; margin: 20px 0; color: #6B7280; }
        .caption { text-align: center; font-size: 9pt; font-style: italic; color: #4B5563; margin-top: 5px; }
        ul { margin-bottom: 15px; }
        li { margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="cover-page">
        <h1>LuxuryStay Hospitality</h1>
        <h2 class="subtitle">Hotel Management System (HMS)</h2>
        <p style="font-size: 16pt; color: #4B5563;">Software Project Documentation</p>
        
        <div class="cover-details">
            <p><b>Student Name:</b> ___________________________</p>
            <p><b>Student ID:</b> ___________________________</p>
            <p><b>Supervisor:</b> ___________________________</p>
            <p><b>Institution:</b> ___________________________</p>
            <p><b>Department:</b> Computer Science / Software Engineering</p>
            <p><b>Submission Date:</b> ___________________________</p>
        </div>
    </div>
    
    <div style="page-break-before: always;"></div>
    
    <h2 class="section-header">1. Abstract</h2>
    <p>The LuxuryStay Hospitality Hotel Management System (HMS) is a state-of-the-art, cloud-based web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system aims to digitalize and automate the entire operational workflow of a modern hotel. It provides an intuitive online booking portal for guests and a powerful, analytics-driven administrative dashboard for hotel managers. The system seamlessly handles room inventory, real-time reservations, staff assignments, housekeeping tracking, and guest service requests, ensuring a premium experience for both hotel administration and guests.</p>
    
    <h2 class="section-header">2. Introduction & Background</h2>
    <h3>2.1 Background</h3>
    <p>The hospitality industry relies heavily on efficient resource management and excellent customer service. Traditional hotels often use fragmented systems or manual ledgers which lead to overbooking, miscommunication between departments, and a subpar guest experience.</p>
    <h3>2.2 Problem Statement</h3>
    <p>Managing a hotel involves coordinating multiple departments (Front Desk, Housekeeping, Maintenance) simultaneously. Without a centralized system, tracking room availability in real-time is difficult, resulting in revenue loss and dissatisfied customers due to delayed room cleanings or ignored service requests.</p>
    <h3>2.3 Proposed Solution</h3>
    <p>LuxuryStay HMS solves these issues by providing a unified, real-time platform. The system features Role-Based Access Control (RBAC) to ensure that Front Desk admins, Housekeeping staff, and Guests have tailored interfaces to perform their specific tasks without bottlenecks.</p>

    <h2 class="section-header">3. Technology Stack</h2>
    <div class="highlight">
        <p>The project utilizes the <b>MERN Stack</b>, a modern, JavaScript-centric ecosystem, ensuring high performance, scalability, and rapid development.</p>
    </div>
    <ul>
        <li><b>Frontend:</b> React.js, Tailwind CSS (for responsive UI), Vite, Recharts (for analytics), SweetAlert2.</li>
        <li><b>Backend:</b> Node.js, Express.js REST API.</li>
        <li><b>Database:</b> MongoDB Atlas (NoSQL) with Mongoose ODM for schema validation.</li>
        <li><b>Security & Auth:</b> JSON Web Tokens (JWT) for stateless authentication, Bcryptjs for password hashing.</li>
        <li><b>Media Storage:</b> Cloudinary API for handling room images and staff avatars.</li>
    </ul>

    <div style="page-break-before: always;"></div>
    
    <h2 class="section-header">4. System Architecture & Diagrams</h2>
    <p>The application follows a standard three-tier architecture (Client, Server, Database) with RESTful API communication.</p>
    
    <h3>4.1 System Architecture Diagram</h3>
    <div style="text-align: center;">
        <img src="${encodeMermaid(sysArch)}" alt="System Architecture Diagram" width="550"/>
        <div class="caption">Figure 1: High-Level System Architecture</div>
    </div>

    <h3>4.2 Database Entity Relationship Diagram (ERD)</h3>
    <p>The database is structured using MongoDB documents, with references (ObjectIds) linking related collections such as Users, Rooms, and Reservations.</p>
    <div style="text-align: center;">
        <img src="${encodeMermaid(erd)}" alt="ERD Diagram" width="550"/>
        <div class="caption">Figure 2: Core Database ER Diagram</div>
    </div>

    <h3>4.3 Reservation Workflow Sequence</h3>
    <div style="text-align: center;">
        <img src="${encodeMermaid(workflow)}" alt="Workflow Diagram" width="550"/>
        <div class="caption">Figure 3: Booking Sequence Diagram</div>
    </div>

    <div style="page-break-before: always;"></div>

    <h2 class="section-header">5. Modules & Features</h2>
    
    <h3>5.1 Authentication & RBAC</h3>
    <p>Secure login and registration system. Users are assigned roles (Admin, Guest, Staff). JWT tokens are stored securely in local storage and sent via HTTP headers for protected routes.</p>
    
    <h3>5.2 Dashboard Analytics</h3>
    <p>The Admin dashboard features real-time Key Performance Indicators (KPIs) such as Total Revenue, Pending Bookings, Rooms to Clean, and dynamic charts visualizing Monthly Revenue Trends and Room Occupancy rates.</p>

    <h3>5.3 Room Inventory Management</h3>
    <p>Admins can add, update, and delete room profiles, complete with pricing, capacities, features, and high-quality image uploads hosted on Cloudinary.</p>

    <h3>5.4 Reservation System</h3>
    <p>Guests can browse available rooms and book their stay. The system automatically prevents double-booking and updates the room's status to 'Occupied' upon check-in.</p>

    <h3>5.5 Staff & Maintenance Management</h3>
    <p>Admins can register staff and assign them to specific maintenance or housekeeping tasks (e.g., Cleaning, Repair). Staff members can log in to update the status of their assigned tasks.</p>

    <h2 class="section-header">6. API Documentation</h2>
    <table>
        <tr><th>Endpoint</th><th>Method</th><th>Role Required</th><th>Description</th></tr>
        <tr><td>/api/users/login</td><td>POST</td><td>Public</td><td>Authenticates user and issues JWT</td></tr>
        <tr><td>/api/users/register</td><td>POST</td><td>Public</td><td>Registers a new guest account</td></tr>
        <tr><td>/api/rooms</td><td>GET</td><td>Public</td><td>Fetches all active rooms for listing</td></tr>
        <tr><td>/api/rooms</td><td>POST</td><td>Admin</td><td>Creates a new room with image uploads</td></tr>
        <tr><td>/api/reservations</td><td>POST</td><td>Guest/Admin</td><td>Creates a new room booking</td></tr>
        <tr><td>/api/staff</td><td>GET</td><td>Admin</td><td>Retrieves hotel staff list</td></tr>
        <tr><td>/api/maintenance</td><td>GET</td><td>Admin/Staff</td><td>Fetches housekeeping/maintenance tasks</td></tr>
        <tr><td>/api/analytics</td><td>GET</td><td>Admin</td><td>Calculates and returns dashboard KPI data</td></tr>
    </table>

    <div style="page-break-before: always;"></div>

    <h2 class="section-header">7. Testing & Quality Assurance</h2>
    <table>
        <tr><th>Test ID</th><th>Module</th><th>Test Scenario</th><th>Expected Result</th><th>Status</th></tr>
        <tr><td>TC-001</td><td>Auth</td><td>Login with invalid password</td><td>Return 401 Unauthorized error message</td><td>Passed</td></tr>
        <tr><td>TC-002</td><td>Rooms</td><td>Create room without price</td><td>Validation error, block submission</td><td>Passed</td></tr>
        <tr><td>TC-003</td><td>Booking</td><td>Book an already occupied room</td><td>Backend rejects request to prevent conflict</td><td>Passed</td></tr>
        <tr><td>TC-004</td><td>Staff</td><td>Update task status to Resolved</td><td>Status updates in DB, UI reflects change</td><td>Passed</td></tr>
        <tr><td>TC-005</td><td>UI/UX</td><td>Delete record confirmation</td><td>SweetAlert warning popup appears before deletion</td><td>Passed</td></tr>
    </table>

    <h2 class="section-header">8. User Interface (Screenshots)</h2>
    <p>The application features a modern, responsive design built with Tailwind CSS. Below are placeholders for the primary interfaces.</p>
    
    <div class="screenshot-box">
        <h3>[Insert Admin Dashboard Screenshot Here]</h3>
        <p>Ensure screenshot shows the KPI cards and Recharts graphs.</p>
    </div>
    <div class="caption">Figure 4: LuxuryStay Admin Analytics Dashboard</div>
    
    <div class="screenshot-box">
        <h3>[Insert Room Management Screenshot Here]</h3>
        <p>Ensure screenshot shows the table of rooms and the "Add Room" modal.</p>
    </div>
    <div class="caption">Figure 5: Room Inventory Management Module</div>

    <div class="screenshot-box">
        <h3>[Insert Guest Booking Flow Screenshot Here]</h3>
        <p>Ensure screenshot shows the guest-facing room listing and booking form.</p>
    </div>
    <div class="caption">Figure 6: Guest Room Booking Interface</div>

    <div style="page-break-before: always;"></div>

    <h2 class="section-header">9. Requirements Traceability Matrix</h2>
    <table>
        <tr><th>Original Requirement</th><th>Implementation Status</th><th>Associated Module</th></tr>
        <tr><td>User Registration & Login (JWT)</td><td>Fully Implemented</td><td>Authentication routes</td></tr>
        <tr><td>Role-Based Access Control</td><td>Fully Implemented</td><td>Frontend Routes / Backend Middleware</td></tr>
        <tr><td>Room Inventory CRUD</td><td>Fully Implemented</td><td>RoomController / Rooms.jsx</td></tr>
        <tr><td>Online Room Booking</td><td>Fully Implemented</td><td>ReservationController</td></tr>
        <tr><td>Staff Task Assignment</td><td>Fully Implemented</td><td>MaintenanceTasks.jsx</td></tr>
        <tr><td>Cloud Image Storage</td><td>Fully Implemented</td><td>Cloudinary / Multer</td></tr>
        <tr><td>Visual Analytics Dashboard</td><td>Fully Implemented</td><td>Recharts / Analytics API</td></tr>
        <tr><td>Online Payment Integration</td><td>Future Enhancement</td><td>Stripe/PayPal Integration (Pending)</td></tr>
    </table>

    <h2 class="section-header">10. Conclusion</h2>
    <p>The LuxuryStay Hospitality Hotel Management System successfully digitalizes core hotel operations. The implementation proves the viability of the MERN stack for developing robust, data-intensive web applications. The system is scalable, secure, and ready for future enhancements such as payment gateway integration and mobile application development.</p>

</body>
</html>
`;

fs.writeFileSync('C:/Users/Talha/Pictures/LuxuryStay-HMS/LuxuryStay_Documentation.html', htmlString);
console.log("HTML file generated successfully.");
