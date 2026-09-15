const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, AlignmentType, WidthType, PageBreak, LevelFormat, Alignment } = docx;

// Helpers
const emptyLine = () => new Paragraph({ text: "" });

const createTitle = (text, size, bold = true) => new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text, bold, size: size * 2, font: "Segoe UI" })]
});

const createHeading = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32, font: "Segoe UI", color: "0A1628" })]
});

const createSubHeading = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 28, font: "Segoe UI", color: "185FA5" })]
});

const createSubSubHeading = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Segoe UI", color: "333333" })]
});

const createText = (text, bold = false) => new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 80, after: 80, line: 320 }, // 1.5 spacing
    children: [new TextRun({ text, bold, size: 22, font: "Segoe UI" })]
});

const createBullet = (text) => new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 50, after: 50, line: 320 },
    children: [new TextRun({ text, size: 22, font: "Segoe UI" })]
});

const createTable = (headers, rowsData) => {
    const headerRow = new TableRow({
        children: headers.map(h => new TableCell({
            shading: { fill: "E6F1FB" },
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Segoe UI" })] })]
        }))
    });

    const dataRows = rowsData.map(rowData => new TableRow({
        children: rowData.map(cellData => new TableCell({
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: String(cellData), size: 20, font: "Segoe UI" })] })]
        }))
    }));

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [headerRow, ...dataRows]
    });
};

const createPlaceholder = (text) => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({
        children: [new TableCell({
            borders: {
                top: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                bottom: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                left: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                right: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
            },
            shading: { fill: "F9FAFB" },
            margins: { top: 1000, bottom: 1000, left: 1000, right: 1000 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text, color: "6B7280", bold: true, size: 24 })] })]
        })]
    })]
});

const doc = new Document({
    sections: [{
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        children: [
            // COVER PAGE
            emptyLine(), emptyLine(), emptyLine(),
            createTitle("LUXURYSTAY HOSPITALITY", 28, true),
            createTitle("Hotel Management System (HMS)", 20, true),
            emptyLine(), emptyLine(),
            createTitle("PROJECT REPORT", 18, true),
            createTitle("Final Semester", 14, false),
            emptyLine(), emptyLine(),
            
            createTable(["Faculty", "Session"], [["Sir Faisal Khan", "2026"]]),
            emptyLine(), emptyLine(),
            createTitle("GROUP MEMBERS", 16, true),
            createTable(["Name", "Student ID"], [
                ["Muhammad Hamza (Team Lead)", "1602603"],
                ["Shariq Mehmmod", "1602602"],
                ["[Student 3 Name]", "[Student 3 ID]"],
                ["[Student 4 Name]", "[Student 4 ID]"]
            ]),
            
            emptyLine(), emptyLine(), emptyLine(),
            createText("Supervisor: [Supervisor Name]", true),
            createText("Institution: Aptech Computer Education", true),
            createText("Submission Date: [Add Date Here]", true),
            
            new Paragraph({ children: [new PageBreak()] }),
            
            // 1. PROJECT INTRODUCTION
            createHeading("1. Project Introduction"),
            createText("LuxuryStay Hospitality HMS is a full-stack web application developed to digitize and streamline the complete hotel management process. The system enables guests to search for rooms, book reservations, and request services online — all through a modern, responsive web interface."),
            createText("The application is built using React.js (frontend), Node.js / Express (backend), and MongoDB (database). It also features an Admin Panel for complete management of rooms, users, reservations, staff tasks, and reporting."),
            
            createSubHeading("1.1 Project Objectives"),
            createBullet("Provide an easy-to-use online room booking platform"),
            createBullet("Allow users to search rooms by type, capacity, and features"),
            createBullet("Support real-time room availability checking"),
            createBullet("Enable reservation cancellation and status tracking"),
            createBullet("Provide housekeeping and maintenance task management for staff"),
            createBullet("Offer an Admin Panel for full system management and analytics"),
            
            createSubHeading("1.2 Technology Stack"),
            createTable(["Layer", "Technology", "Details"], [
                ["Frontend", "React.js", "JavaScript, Tailwind CSS, Vite"],
                ["Backend", "Node.js & Express.js", "JavaScript, REST API"],
                ["Database", "MongoDB", "NoSQL, Mongoose ODM, MongoDB Atlas"],
                ["Media Storage", "Cloudinary", "Cloud-based Image Hosting"],
                ["Tools", "VS Code", "Postman, MongoDB Compass, Git"]
            ]),

            new Paragraph({ children: [new PageBreak()] }),

            // 2. CRS
            createHeading("2. Customer Requirement Specification (CRS)"),
            createText("This section documents the complete functional and non-functional requirements gathered for the LuxuryStay HMS."),
            
            createSubHeading("2.1 Functional Requirements"),
            createSubSubHeading("2.1.1 User Management"),
            createBullet("Users can register with full personal details (name, email, password)"),
            createBullet("Users can login with email and password"),
            createBullet("Guest users can browse available rooms without registering"),
            createBullet("Users can update their profile information"),
            
            createSubSubHeading("2.1.2 Room Search & Booking"),
            createBullet("Users can view rooms filtered by status (Available/Occupied)"),
            createBullet("System displays room details including price, capacity, floor, and features"),
            createBullet("Users can select check-in and check-out dates"),
            createBullet("System prevents double-booking of the same room on overlapping dates"),
            
            createSubSubHeading("2.1.3 Booking Management"),
            createBullet("Users can view all their bookings (Pending, Confirmed, Cancelled, Completed)"),
            createBullet("Users can cancel their pending bookings"),
            
            createSubSubHeading("2.1.4 Admin Panel"),
            createBullet("Admin can login with special admin credentials"),
            createBullet("Admin can view dashboard with total revenue, pending bookings, check-ins, and check-outs"),
            createBullet("Admin can add, edit, and delete rooms and upload room images"),
            createBullet("Admin can manage user roles and staff shifts"),
            createBullet("Admin can assign maintenance and housekeeping tasks to staff"),
            
            createSubSubHeading("2.1.5 Staff Panel"),
            createBullet("Staff members can login to view assigned maintenance tasks"),
            createBullet("Staff can update task status (Pending -> In Progress -> Resolved)"),
            
            createSubHeading("2.2 Non-Functional Requirements"),
            createTable(["Requirement", "Description"], [
                ["Performance", "Pages must load quickly; API responses within 1 second"],
                ["Security", "Passwords hashed using bcryptjs; JWT for secure sessions; HTTPS enforced"],
                ["Usability", "Responsive design for desktop and mobile devices"],
                ["Reliability", "System must maintain high uptime; MongoDB Atlas ensures data availability"],
                ["Scalability", "MERN stack allows independent scaling of frontend and backend"]
            ]),

            new Paragraph({ children: [new PageBreak()] }),

            // 3. ER DIAGRAM
            createHeading("3. ER Diagram — Hotel Management System"),
            createText("The Entity-Relationship Diagram below illustrates the complete database structure and relationships between all entities in the LuxuryStay HMS."),
            emptyLine(),
            createPlaceholder("[Insert ER Diagram Here (Use code from: 2_ER_Diagram.png)]"),
            emptyLine(),
            
            createSubHeading("3.1 Entities and Relationships"),
            createTable(["Entity", "Primary Key", "Key Attributes"], [
                ["Users", "_id", "FullName, Email, Password, Role"],
                ["Rooms", "_id", "RoomNumber, Type, PricePerNight, Capacity, Status"],
                ["Reservations", "_id", "UserId, RoomId, CheckInDate, CheckOutDate, TotalAmount"],
                ["Staff", "_id", "FullName, Role, Shift, Salary"],
                ["MaintenanceTasks", "_id", "RoomId, AssignedTo, IssueType, Status"],
                ["ServiceRequests", "_id", "GuestId, RoomId, ServiceType, Status"]
            ]),
            
            createSubHeading("3.2 Key Relationships"),
            createBullet("User (1) ---- (M) Reservation: One user can have many reservations"),
            createBullet("Room (1) ---- (M) Reservation: One room can have many reservation records over time"),
            createBullet("Room (1) ---- (M) MaintenanceTask: One room can require many maintenance tasks"),
            createBullet("Staff (1) ---- (M) MaintenanceTask: One staff member can be assigned multiple tasks"),

            new Paragraph({ children: [new PageBreak()] }),

            // 4. DFD
            createHeading("4. Data Flow Diagram (DFD)"),
            emptyLine(),
            createPlaceholder("[Insert DFD Diagram Here (Use code from: 4_DFD.png)]"),
            emptyLine(),
            createSubHeading("4.1 Level 0 — Context Diagram"),
            createTable(["External Entity", "Input to System", "Output from System"], [
                ["Guest", "Login, Search Rooms, Book Dates", "Booking Confirmation, Room Details"],
                ["Admin", "Room Data, Staff Details, Task Assignment", "Dashboard Statistics, Management Reports"],
                ["Staff", "Task Updates", "Assigned Task Lists"]
            ]),
            
            createSubHeading("4.2 Level 1 — Detailed DFD"),
            createSubSubHeading("Process 1.0 — User Authentication"),
            createBullet("Input: Email + Password from User"),
            createBullet("Process: Validate credentials, verify bcrypt hash, generate JWT"),
            createBullet("Output: JWT session stored in localStorage"),
            
            createSubSubHeading("Process 2.0 — Room Search & Booking"),
            createBullet("Input: Selected room, check-in date, check-out date"),
            createBullet("Process: Query Reservations collection to ensure dates don't overlap, create Reservation, update Room status"),
            createBullet("Output: Success notification, Booking record created"),
            
            createSubSubHeading("Process 3.0 — Admin Management"),
            createBullet("Input: Room details, Image files"),
            createBullet("Process: Upload image to Cloudinary, save room data to MongoDB"),
            createBullet("Output: Updated room inventory list"),

            new Paragraph({ children: [new PageBreak()] }),

            // 5. FLOW CHART
            createHeading("5. System Flow Chart"),
            emptyLine(),
            createPlaceholder("[Insert System Workflow Diagram Here (Use code from: 5_Complete_Workflow.png)]"),
            emptyLine(),
            createSubHeading("5.1 Main Booking Flow"),
            createTable(["Step", "Action / Decision"], [
                ["START", "User visits LuxuryStay website"],
                ["1", "User views available rooms on Home Page / Rooms Page"],
                ["2", "DECISION: Is user logged in?"],
                ["2a", "YES → Proceed to Book | NO → Redirect to Login"],
                ["3", "User selects Check-in and Check-out dates"],
                ["4", "System queries database for date conflicts"],
                ["5", "DECISION: Dates Available?"],
                ["5a", "NO → Show 'Dates unavailable' | YES → Confirm Booking"],
                ["6", "Reservation saved → Room status updated"],
                ["END", "Booking complete → User views 'My Bookings'"]
            ]),
            
            createSubHeading("5.2 Admin Flow"),
            createBullet("Admin logs in with credentials → Role='admin' → Redirected to /admin/dashboard"),
            createBullet("Admin views KPIs: total revenue, pending bookings, guests"),
            createBullet("Admin manages rooms: Add new room, Upload photos, Change status (Available/Maintenance)"),
            createBullet("Admin manages staff: Add staff, Set shifts"),
            createBullet("Admin assigns Housekeeping tasks to staff members"),

            new Paragraph({ children: [new PageBreak()] }),

            // 6. ARCHITECTURE
            createHeading("6. Architecture and Design of the Project"),
            emptyLine(),
            createPlaceholder("[Insert Architecture Diagram Here (Use code from: 1_System_Architecture.png)]"),
            emptyLine(),
            createSubHeading("6.1 System Architecture Overview"),
            createText("LuxuryStay HMS follows a 3-Tier Architecture pattern with clear separation between Presentation, Business Logic, and Data layers."),
            createTable(["Tier", "Technology", "Responsibility"], [
                ["Presentation Layer", "React.js (JavaScript)", "UI components, forms, routing (React Router), state management"],
                ["Business Logic Layer", "Node.js & Express.js", "Controllers, business rules, JWT auth, Cloudinary uploads"],
                ["Data Layer", "MongoDB Atlas", "Database models (Mongoose), schemas, aggregation queries"]
            ]),
            
            createSubHeading("6.2 React Architecture Overview"),
            createBullet("App.jsx — Root component handling React Router routes"),
            createBullet("Components — Reusable UI parts like Navbar, Sidebar, Modal, NotificationsDropdown"),
            createBullet("Pages — Full views like Home, Login, Rooms, Reservations, MaintenanceTasks"),
            createBullet("Services (api.js) — Axios instance configured to inject JWT tokens into API requests"),
            
            emptyLine(),
            createSubHeading("6.3 Use Case Diagram"),
            createPlaceholder("[Insert Use Case Diagram Here (Use code from: 3_Use_Case.png)]"),
            emptyLine(),
            
            createSubHeading("6.4 Authentication Sequence"),
            createPlaceholder("[Insert Auth Sequence Diagram Here (Use code from: 6_Auth_Sequence.png)]"),
            emptyLine(),
            
            createSubHeading("6.5 Role-Based Access Control (RBAC) Flow"),
            createPlaceholder("[Insert RBAC Flow Diagram Here (Use code from: 7_RBAC_Flow.png)]"),
            emptyLine(),

            new Paragraph({ children: [new PageBreak()] }),

            // 7. DATABASE DESIGN
            createHeading("7. Database Design / Structure"),
            createText("The database consists of collections managed via Mongoose schemas. All collections follow NoSQL principles with appropriate references."),
            
            createSubHeading("7.1 Database Collections"),
            createSubSubHeading("Collection 1: Users"),
            createTable(["Field", "Type", "Description"], [
                ["_id", "ObjectId", "Primary Key"],
                ["fullName", "String", "User's full name"],
                ["email", "String", "Unique email address"],
                ["password", "String", "Bcrypt hashed password"],
                ["role", "String", "admin, guest, or staff"]
            ]),
            
            createSubSubHeading("Collection 2: Rooms"),
            createTable(["Field", "Type", "Description"], [
                ["_id", "ObjectId", "Primary Key"],
                ["roomNumber", "String", "Unique room identifier"],
                ["type", "String", "Single, Double, Suite"],
                ["pricePerNight", "Number", "Cost per night"],
                ["status", "String", "available, occupied, maintenance"],
                ["images", "Array", "Cloudinary image URLs"]
            ]),
            
            createSubSubHeading("Collection 3: Reservations"),
            createTable(["Field", "Type", "Description"], [
                ["_id", "ObjectId", "Primary Key"],
                ["userId", "ObjectId", "Reference to Users collection"],
                ["roomId", "ObjectId", "Reference to Rooms collection"],
                ["checkInDate", "Date", "Start date"],
                ["checkOutDate", "Date", "End date"],
                ["totalAmount", "Number", "Calculated total price"],
                ["bookingStatus", "String", "Pending, Confirmed, Cancelled"]
            ]),

            new Paragraph({ children: [new PageBreak()] }),

            // 8. PROJECT PLAN
            createHeading("8. Project Plan"),
            createSubHeading("8.1 Development Phases"),
            createTable(["#", "Phase", "Deliverables"], [
                ["1", "Planning & Analysis", "Requirements gathering, project scope"],
                ["2", "Database Design", "Mongoose Schemas, MongoDB setup"],
                ["3", "Backend Development", "Express APIs, JWT Auth, Cloudinary setup"],
                ["4", "Frontend Development", "React UI, Tailwind CSS, API Integration"],
                ["5", "Admin Panel", "Dashboard, KPIs, Recharts, Management tools"],
                ["6", "Integration & Testing", "End-to-end testing, bug fixing"],
                ["7", "Documentation", "Final project report"]
            ]),
            
            createSubHeading("8.2 Team Responsibilities"),
            createTable(["Team Member", "Student ID", "Responsibilities"], [
                ["Muhammad Hamza", "1602603", "Database design, Backend APIs, Cloudinary Integration"],
                ["Shariq Mehmmod", "1602602", "React Frontend, Tailwind CSS styling, Routing"],
                ["[Student 3 Name]", "[Student 3 ID]", "Admin Panel, KPI Dashboard, Analytics Charts"],
                ["[Student 4 Name]", "[Student 4 ID]", "Testing, Bug Fixing, Report Documentation"]
            ]),

            new Paragraph({ children: [new PageBreak()] }),

            // 9. GUI STANDARDS
            createHeading("9. GUI Standards Document"),
            createSubHeading("9.1 Color Scheme"),
            createTable(["Color Name", "Hex Code", "Usage"], [
                ["Primary Blue", "#1E3A8A", "Navbar, Headings, Primary Buttons"],
                ["Gold/Accent", "#D97706", "Highlights, Borders, Warning Badges"],
                ["Background Gray", "#F9FAFB", "Page backgrounds, subtle card backgrounds"],
                ["Success Green", "#10B981", "Confirmed status, Success Toasts"],
                ["Danger Red", "#EF4444", "Delete buttons, Cancelled status"]
            ]),
            
            createSubHeading("9.2 Typography"),
            createText("• Base Font: Inter / Segoe UI (Clean, readable sans-serif)"),
            createText("• Headings: Bold, Dark Blue for primary focus"),
            
            createSubHeading("9.3 UI Components"),
            createText("• Buttons: Rounded corners (rounded-xl), hover effects (scale-95), drop shadows."),
            createText("• Cards: White background, subtle border (border-gray-100), box shadow on hover."),
            createText("• Alerts/Modals: SweetAlert2 for beautiful, animated confirmation popups."),

            new Paragraph({ children: [new PageBreak()] }),

            // 10. INTERFACE DESIGN
            createHeading("10. Interface Design Document"),
            createSubHeading("10.1 Pages Overview"),
            
            createSubSubHeading("10.1.1 Home Page"),
            createPlaceholder("[Insert Home Page Screenshot Here (Take a screenshot of the main page)]"),
            createText("The Home Page features a welcome section, KPI cards for the admin (Revenue, Bookings, Guests), and analytical charts. For guests, it shows quick links to book rooms and view history."),
            
            createSubSubHeading("10.1.2 Dashboard"),
            createPlaceholder("[Insert Admin Dashboard Screenshot Here (Take a screenshot of the Admin Dashboard showing charts)]"),
            createText("The dashboard provides a high-level overview of hotel operations, visualizing revenue trends and room occupancy rates via interactive charts."),
            
            createSubSubHeading("10.1.3 Room Management"),
            createPlaceholder("[Insert Room Management Screenshot Here (Take a screenshot of the Rooms table)]"),
            createText("Displays a tabular list of all rooms. Admins can click 'Add Room' to open a modal form supporting image uploads, bed configurations, and pricing."),
            
            createSubSubHeading("10.1.4 Staff & Maintenance"),
            createPlaceholder("[Insert Maintenance Tasks Screenshot Here (Take a screenshot of the Maintenance table)]"),
            createText("Allows assignment of cleaning/repair tasks to specific staff members. Features dynamic dropdowns for updating task status (Pending, In Progress, Resolved)."),

            new Paragraph({ children: [new PageBreak()] }),

            // 11. TESTING
            createHeading("11. Unit Testing Checklist"),
            createSubHeading("11.1 Authentication Testing"),
            createTable(["Test Case", "Expected Result", "Status"], [
                ["Register with valid data", "Account created, redirect to login", "PASS"],
                ["Login with correct credentials", "JWT generated, redirect to Dashboard", "PASS"],
                ["Access admin route as guest", "Redirected away / Access Denied", "PASS"]
            ]),
            
            createSubHeading("11.2 Booking Testing"),
            createTable(["Test Case", "Expected Result", "Status"], [
                ["Book room with available dates", "Reservation created successfully", "PASS"],
                ["Book room with overlapping dates", "Error: Room is already booked", "PASS"],
                ["Book room without logging in", "Redirected to login page", "PASS"]
            ]),
            
            createSubHeading("11.3 Admin Panel Testing"),
            createTable(["Test Case", "Expected Result", "Status"], [
                ["Add new room with image", "Room added, image uploaded to Cloudinary", "PASS"],
                ["Delete room with SweetAlert", "Prompt shows, deletes after confirmation", "PASS"],
                ["Update task status", "Database updates, UI reflects new status", "PASS"]
            ]),

            new Paragraph({ children: [new PageBreak()] }),

            // 12. CONCLUSION
            createHeading("12. Conclusion"),
            createText("The LuxuryStay HMS successfully demonstrates a complete, production-ready web application built using modern web technologies. The project covers all essential aspects of a real-world hotel booking platform including user authentication, room search and booking, admin management, and staff task tracking."),
            createText("Through this project, our team gained practical experience with React frontend development, Node.js backend architecture, MongoDB NoSQL database management, and third-party API integration using Cloudinary."),
            
            createSubHeading("Future Enhancements"),
            createBullet("Integration with real payment gateways (Stripe, PayPal)"),
            createBullet("Real-time notifications using WebSockets (Socket.io)"),
            createBullet("Mobile application utilizing React Native"),
            createBullet("Automated email confirmations for bookings via Nodemailer"),
            
            emptyLine(), emptyLine(), emptyLine(),
            createParagraphCenter("LuxuryStay Hotel Management System"),
            createParagraphCenter(`Final Semester Project | Faculty: Sir Faisal Khan | 2026`)
        ]
    }]
});

// Helper for center text
function createParagraphCenter(text) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: true, color: "185FA5", font: "Segoe UI" })]
    });
}

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('C:/Users/Talha/Pictures/LuxuryStay-HMS/LuxuryStay_Hospitality_HMS_Project_Documentation_Final_v2.docx', buffer);
    console.log("Final DOCX generated!");
});
