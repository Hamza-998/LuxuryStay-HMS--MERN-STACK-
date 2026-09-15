const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, AlignmentType, WidthType, PageBreak, PageNumber, PageNumberFormat } = docx;

// Helper for empty lines
const emptyLine = () => new Paragraph({ text: "" });

// Helper for centered large title
const createTitle = (text, size = 48, isBold = true, color = "1E3A8A") => {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [
            new TextRun({
                text: text,
                bold: isBold,
                size: size, // half-points (48 = 24pt)
                color: color,
                font: "Segoe UI"
            })
        ]
    });
};

// Helper for section headings
const createHeading = (text) => {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        border: {
            bottom: {
                color: "D97706",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 12,
            },
        },
        children: [
            new TextRun({
                text: text,
                color: "1E3A8A",
                font: "Segoe UI"
            })
        ]
    });
};

// Helper for subheadings
const createSubHeading = (text) => {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
            new TextRun({
                text: text,
                color: "374151",
                font: "Segoe UI"
            })
        ]
    });
};

// Helper for standard text
const createText = (text, isBold = false) => {
    return new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 100, after: 100, line: 360 }, // 1.5 line spacing
        children: [
            new TextRun({
                text: text,
                bold: isBold,
                size: 24, // 12pt
                font: "Calibri"
            })
        ]
    });
};

// Helper for placeholder boxes
const createPlaceholder = (text) => {
    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: {
                            top: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                            bottom: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                            left: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                            right: { style: BorderStyle.DASHED, size: 12, color: "9CA3AF" },
                        },
                        shading: { fill: "F9FAFB" },
                        margins: { top: 1000, bottom: 1000, left: 1000, right: 1000 },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({ text: text, color: "6B7280", bold: true, size: 28 })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Calibri" }
            }
        }
    },
    sections: [
        {
            properties: {
                page: {
                    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
                }
            },
            children: [
                // ---------------- COVER PAGE ----------------
                emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
                
                createTitle("LuxuryStay Hospitality", 72, true, "1E3A8A"), // 36pt
                createTitle("Hotel Management System (HMS)", 48, true, "D97706"), // 24pt
                emptyLine(),
                createTitle("Final Software Project Documentation", 36, false, "4B5563"), // 18pt
                
                emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
                
                // Student Details Table
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                        insideHorizontal: { style: BorderStyle.NONE },
                        insideVertical: { style: BorderStyle.NONE },
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [createText("Muhammad Hamza (Team Lead)", true)] }),
                                new TableCell({ children: [createText("ID: 1602603")] })
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [createText("Shariq Mehmmod", true)] }),
                                new TableCell({ children: [createText("ID: 1602602")] })
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [createText("[Student 3 Name]", true)] }),
                                new TableCell({ children: [createText("ID: [Student 3 ID]")] })
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [createText("[Student 4 Name]", true)] }),
                                new TableCell({ children: [createText("ID: [Student 4 ID]")] })
                            ]
                        })
                    ]
                }),
                
                emptyLine(), emptyLine(), emptyLine(),
                
                createText("Supervisor: [Supervisor Name]", true),
                createText("Institution: Aptech Computer Education", true),
                createText("Submission Date: " + new Date().toLocaleDateString(), true),
                
                new Paragraph({ children: [new PageBreak()] }),
                
                // ---------------- ABSTRACT ----------------
                createHeading("1. Abstract"),
                createText("The LuxuryStay Hospitality Hotel Management System (HMS) is a state-of-the-art, cloud-based web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system aims to digitalize and automate the entire operational workflow of a modern hotel. It provides an intuitive online booking portal for guests and a powerful, analytics-driven administrative dashboard for hotel managers. The system seamlessly handles room inventory, real-time reservations, staff assignments, housekeeping tracking, and guest service requests, ensuring a premium experience for both hotel administration and guests."),
                
                // ---------------- INTRODUCTION ----------------
                createHeading("2. Introduction & Background"),
                createSubHeading("2.1 Background"),
                createText("The hospitality industry relies heavily on efficient resource management and excellent customer service. Traditional hotels often use fragmented systems or manual ledgers which lead to overbooking, miscommunication between departments, and a subpar guest experience."),
                createSubHeading("2.2 Problem Statement"),
                createText("Managing a hotel involves coordinating multiple departments (Front Desk, Housekeeping, Maintenance) simultaneously. Without a centralized system, tracking room availability in real-time is difficult, resulting in revenue loss and dissatisfied customers due to delayed room cleanings or ignored service requests."),
                createSubHeading("2.3 Proposed Solution"),
                createText("LuxuryStay HMS solves these issues by providing a unified, real-time platform. The system features Role-Based Access Control (RBAC) to ensure that Front Desk admins, Housekeeping staff, and Guests have tailored interfaces to perform their specific tasks without bottlenecks."),
                
                // ---------------- TECH STACK ----------------
                createHeading("3. Technology Stack"),
                createText("The project utilizes the MERN Stack, a modern, JavaScript-centric ecosystem, ensuring high performance, scalability, and rapid development."),
                createText("• Frontend: React.js, Tailwind CSS, Vite, Recharts, SweetAlert2."),
                createText("• Backend: Node.js, Express.js REST API."),
                createText("• Database: MongoDB Atlas (NoSQL) with Mongoose ODM for schema validation."),
                createText("• Security & Auth: JSON Web Tokens (JWT) for stateless authentication, Bcryptjs for password hashing."),
                createText("• Media Storage: Cloudinary API for handling room images and staff avatars."),
                
                new Paragraph({ children: [new PageBreak()] }),
                
                // ---------------- SYSTEM ARCHITECTURE ----------------
                createHeading("4. System Architecture"),
                createText("The application follows a standard three-tier architecture (Client, Server, Database) with RESTful API communication. The React frontend consumes the Express/Node.js API, which interacts with MongoDB Atlas and external APIs like Cloudinary."),
                emptyLine(),
                createPlaceholder("[Insert System Architecture Diagram Here (Check Documentation_Diagrams folder for code)]"),
                emptyLine(),
                
                // ---------------- USE CASES ----------------
                createHeading("5. Use Case Diagrams"),
                createText("The system defines distinct use cases for Admins, Staff, and Guests. Admins manage the core inventory, Staff handle daily tasks, and Guests book rooms."),
                emptyLine(),
                createPlaceholder("[Insert Use Case Diagram Here (Check Documentation_Diagrams folder for code)]"),
                emptyLine(),
                
                new Paragraph({ children: [new PageBreak()] }),
                
                // ---------------- DATABASE DESIGN ----------------
                createHeading("6. Database Design (ERD)"),
                createText("The database is structured using MongoDB collections, with Mongoose schema references (ObjectIds) linking related documents such as Users, Rooms, MaintenanceTasks, and Reservations."),
                emptyLine(),
                createPlaceholder("[Insert Entity Relationship Diagram (ERD) Here (Check Documentation_Diagrams folder for code)]"),
                emptyLine(),
                
                // ---------------- WORKFLOWS ----------------
                createHeading("7. System Workflows"),
                createSubHeading("7.1 Reservation Workflow"),
                createText("When a guest attempts to book a room, the system queries the database to ensure the dates do not conflict with existing reservations. If clear, a new reservation document is created and the room's status is updated to Occupied."),
                emptyLine(),
                createPlaceholder("[Insert Reservation Workflow Sequence Diagram Here (Check Documentation_Diagrams folder for code)]"),
                emptyLine(),
                
                new Paragraph({ children: [new PageBreak()] }),
                
                // ---------------- UI SCREENSHOTS ----------------
                createHeading("8. User Interface (Screenshots)"),
                createText("The application features a modern, responsive design built with Tailwind CSS. Below are placeholders for the primary interfaces to be attached."),
                
                emptyLine(),
                createPlaceholder("[Insert Screenshot: Admin Dashboard (KPIs & Charts) Here]"),
                emptyLine(),
                createPlaceholder("[Insert Screenshot: Room Inventory Management Here]"),
                emptyLine(),
                createPlaceholder("[Insert Screenshot: Staff Task Management Here]"),
                emptyLine(),
                createPlaceholder("[Insert Screenshot: Guest Room Booking Interface Here]"),
                emptyLine(),
                
                // ---------------- MATRIX ----------------
                createHeading("9. Requirements Traceability Matrix"),
                createText("• User Registration & Login (JWT) -> Fully Implemented (Auth routes)"),
                createText("• Role-Based Access Control -> Fully Implemented (Frontend Routes / Backend Middleware)"),
                createText("• Room Inventory CRUD -> Fully Implemented (RoomController)"),
                createText("• Online Room Booking -> Fully Implemented (ReservationController)"),
                createText("• Staff Task Assignment -> Fully Implemented (MaintenanceTasks.jsx)"),
                createText("• Cloud Image Storage -> Fully Implemented (Cloudinary / Multer)"),
                createText("• Visual Analytics Dashboard -> Fully Implemented (Recharts / Analytics API)"),
                createText("• Online Payment Integration -> Future Enhancement (Pending)"),
                
                emptyLine(),
                createHeading("10. Conclusion"),
                createText("The LuxuryStay Hospitality Hotel Management System successfully digitalizes core hotel operations. The implementation proves the viability of the MERN stack for developing robust, data-intensive web applications. The system is highly scalable, secure, and ready for future enhancements.")
            ]
        }
    ]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('C:/Users/Talha/Pictures/LuxuryStay-HMS/LuxuryStay_Hospitality_HMS_Project_Documentation.docx', buffer);
    console.log("Native DOCX successfully generated!");
}).catch(err => {
    console.error("Error writing DOCX:", err);
});
