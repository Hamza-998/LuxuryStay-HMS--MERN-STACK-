const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType, PageBreak } = require('docx');

// Formatting Helpers
function h1(text) { return new Paragraph({ text: text, heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }); }
function h2(text) { return new Paragraph({ text: text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } }); }
function p(text, bold = false) { return new Paragraph({ children: [new TextRun({ text: text, bold: bold, size: 24 })], spacing: { after: 120 } }); }
function codeBlock(code) {
    if (!code) return p("Is question ki direct code example project mein nahi mili.", true);
    const lines = code.split('\n');
    return new Paragraph({
        children: lines.map((line, i) => new TextRun({ text: line, font: "Courier New", size: 20, break: i > 0 ? 1 : 0 })),
        shading: { fill: "F0F0F0" },
        spacing: { before: 100, after: 100 },
        indent: { left: 300 }
    });
}
function emptyLine() { return new Paragraph({ text: "" }); }

function createVivaQuestion(qNo, question, answer, code, codeExp, shortAns, fileLoc) {
    const blocks = [
        h2(`Q${qNo}: ${question}`),
        p("Simple Roman English Answer:", true),
        p(answer),
        p("Hamare Actual Project Code Ki Example:", true),
        codeBlock(code),
        p("Code Ki Roman English Explanation:", true),
        p(codeExp),
        p("Viva Mein Bolne Wala Short Answer:", true),
        p(shortAns),
        p("Related File/Folder: ", true),
        p(fileLoc),
        emptyLine()
    ];
    return blocks;
}

// Helper to create tables
function createTable(headers, rows) {
    const tableRows = [];

    // Header Row
    tableRows.push(new TableRow({
        children: headers.map(header => new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: header, bold: true, size: 24 })] })],
            shading: { fill: "D9E2F3" },
            margins: { top: 100, bottom: 100, left: 100, right: 100 }
        }))
    }));

    // Data Rows
    rows.forEach(row => {
        tableRows.push(new TableRow({
            children: row.map(cellText => new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: cellText, size: 24 })] })],
                margins: { top: 100, bottom: 100, left: 100, right: 100 }
            }))
        }));
    });

    return new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
        }
    });
}

// Generate Doc
const doc = new Document({
    sections: [{
        properties: { page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } } },
        children: [
            new Paragraph({ text: "LuxuryStay HMS – Roman English Viva Practice Sheet", heading: HeadingLevel.TITLE }),
            
            // 1. PROJECT INTRODUCTION
            h1("1. PROJECT INTRODUCTION"),
            p("Q: Apne project ke bare mein batao.", true),
            p("Sir, hamara project 'LuxuryStay Hospitality – Hotel Management System' hai. Ye aik complete MERN stack web application hai. Iska maqsad hotel ki bookings, rooms, aur staff ko easily manage karna hai. Ismein guest rooms book kar sakte hain, aur admin dashboard se poore hotel ka revenue, staff ke tasks aur check-ins ko handle kar sakta hai. Ye manual register system ko khatam karke sab kuch digital aur fast banata hai."),

            // 2. TECHNOLOGIES USED
            h1("2. TECHNOLOGIES USED IN OUR PROJECT"),
            ...createVivaQuestion(1, "React kya hai?", 
                "React aik JavaScript library hai jo hum frontend aur user interface banane ke liye use karte hain.",
                "import React, { useState } from 'react';\nfunction App() {\n  return <div>Welcome to LuxuryStay</div>;\n}",
                "Ye ek basic React component hai jo browser par 'Welcome to LuxuryStay' show karega.",
                "Sir, React humne apni website ka frontend banane ke liye use ki hai taake website bina reload hue fast chale.",
                "views/luxury-stay-frontend/src/App.jsx"),

            ...createVivaQuestion(2, "Node.js kya hai?", 
                "Node.js aik runtime environment hai jo JavaScript ko browser ke bahar server par run karne ki ijazat deta hai.",
                "const express = require('express');\nconst app = express();\napp.listen(5000, () => console.log('Server running on port 5000'));",
                "Yahan Node.js ki madad se humne backend ka server start kiya hai jo port 5000 par run ho raha hai.",
                "Sir, Node.js humara backend server run karne ke liye use hota hai.",
                "server.js"),

            ...createVivaQuestion(3, "MongoDB kya hai?", 
                "MongoDB aik NoSQL database hai jo data ko tables ke bajaye JSON (documents) format mein save karta hai.",
                "mongoose.connect(process.env.MONGO_URI, {\n  useNewUrlParser: true\n});",
                "Ye code hamare Node backend ko MongoDB database se connect kar raha hai.",
                "Sir, MongoDB humara database hai jahan hotel ke users aur bookings ka data save hota hai.",
                "config/db.js ya server.js"),

            ...createVivaQuestion(4, "Express.js kya hai?", 
                "Express.js Node.js ka aik framework hai jo APIs (routes) banane ko bohot asaan kar deta hai.",
                "const router = express.Router();\nrouter.get('/rooms', getRooms);",
                "Yahan Express router use ho raha hai jo '/rooms' ke URL par getRooms ka function call karega.",
                "Sir, Express.js backend mein APIs banane aur URLs ko manage karne ke liye use hota hai.",
                "routes/roomRoutes.js"),

            ...createVivaQuestion(5, "Tailwind CSS kya hai?", 
                "Tailwind aik utility-first CSS framework hai jisse hum classes directly HTML/JSX mein likh kar styling karte hain.",
                "<button className='bg-blue-500 text-white p-2 rounded'>\n  Book Now\n</button>",
                "Is code mein 'bg-blue-500' se button ka color blue aur 'text-white' se text white ho raha hai bina alag se CSS file banaye.",
                "Sir, Tailwind CSS humne apni website ka design aur styling jaldi aur khoobsurat banane ke liye use ki hai.",
                "Frontend Components"),

            // 3. FRONTEND QUESTIONS
            h1("3. FRONTEND QUESTIONS"),
            ...createVivaQuestion(6, "useState kya hai?", 
                "useState React ka aik hook hai jo component ke andar data (state) ko save aur update karne ke liye use hota hai.",
                "const [isSaving, setIsSaving] = useState(false);\n// To update:\nsetIsSaving(true);",
                "Yahan 'isSaving' aik variable hai aur 'setIsSaving' usko update karne ka function. Shuru mein iski value false hai.",
                "Sir, useState screen par data store aur change karne ke liye use hota hai.",
                "views/luxury-stay-frontend/src/pages/Rooms.jsx"),

            ...createVivaQuestion(7, "useEffect kya hai?", 
                "useEffect React ka hook hai jo tab run hota hai jab page load hota hai (ya data change hota hai), jaise API se data mangwana.",
                "useEffect(() => {\n  fetchRooms();\n}, []);",
                "Jab bhi ye page khulega, ye code automatically backend se rooms ka data (fetchRooms) mangwayega.",
                "Sir, useEffect page load hotay hi backend se data fetch karne ke liye use hota hai.",
                "Frontend Pages"),

            ...createVivaQuestion(8, "Axios kya hai?", 
                "Axios aik library hai jo frontend se backend tak requests (GET, POST) bhejney ke liye use hoti hai.",
                "const response = await axios.post('/api/auth/login', { email, password });",
                "Yahan frontend se user ka email aur password backend ki login API par bheja ja raha hai.",
                "Sir, Axios React se Node backend ko data bhejne aur mangwane ke liye use hota hai.",
                "Frontend api.js"),

            // 4. BACKEND QUESTIONS
            h1("4. BACKEND QUESTIONS"),
            ...createVivaQuestion(9, "Mongoose kya hai?", 
                "Mongoose MongoDB ke liye aik library hai jo data ka structure (schema) define karne mein madad karti hai.",
                "const RoomSchema = new mongoose.Schema({\n  roomNumber: { type: String, required: true },\n  price: Number\n});",
                "Yahan hum bata rahe hain ke Room ke data mein roomNumber string hoga aur price number hoga.",
                "Sir, Mongoose database mein data ka structure aur rules banane ke liye use hota hai.",
                "Model/Room.js"),

            ...createVivaQuestion(10, "Middleware kya hota hai?", 
                "Middleware aik function hai jo request anay aur controller tak pohnchne ke darmiyan run hota hai (jaise security check).",
                "const protect = (req, res, next) => {\n  if(req.headers.authorization) {\n    next(); // Pass to controller\n  }\n};",
                "Ye code check kar raha hai ke user ke paas token hai ya nahi, agar hai tou 'next()' call hoga.",
                "Sir, Middleware API ko protect karne aur request ko verify karne ke liye use hota hai.",
                "middleware/auth.js"),

            // 5. AUTHENTICATION & SECURITY
            h1("5. AUTHENTICATION & SECURITY"),
            ...createVivaQuestion(11, "JWT (JSON Web Token) kya hai?", 
                "JWT aik secure token hai jo user ko login hone par milta hai taake wo agli dafa bina password ke verify ho sakay.",
                "const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {\n  expiresIn: '30d'\n});",
                "Yahan user ki ID ko secret key ke sath lock kar ke 30 din ka token banaya ja raha hai.",
                "Sir, JWT login ke baad user ko verify rakhne ka aik secure tareeqa hai.",
                "controllers/authController.js"),

            ...createVivaQuestion(12, "bcrypt kya hai?", 
                "bcrypt aik library hai jo user ke password ko encrypt (hash) karke database mein save karti hai taake koi password parh na sakay.",
                "const isMatch = await bcrypt.compare(enteredPassword, user.password);",
                "Ye code user ke dale hue password ko database mein mojood encrypted password se match kar raha hai.",
                "Sir, bcrypt passwords ko secure aur hash karne ke liye use hota hai.",
                "Model/User.js / authController.js"),

            // 6. MODULES
            h1("6. PROJECT MODULES"),
            ...createVivaQuestion(13, "Room Management module kya karta hai?", 
                "Is module mein Admin naye rooms add kar sakta hai, unki price set kar sakta hai aur unhe delete ya update kar sakta hai.",
                "const createRoom = async (req, res) => {\n  const room = await Room.create(req.body);\n  res.status(201).json(room);\n};",
                "Ye backend function database mein naya room create kar raha hai aur 201 Success status bhej raha hai.",
                "Sir, is module ke zariye admin hotel ke total rooms aur unki details ko control karta hai.",
                "controllers/roomController.js"),

            // 7. PROJECT WORKFLOW
            h1("7. SIMPLE PROJECT WORKFLOW"),
            p("Technical Workflow:", true),
            p("Frontend (React) --> API Request (Axios) --> Backend (Express) --> Controller/Logic --> Database (MongoDB) --> Response Back to Frontend"),
            emptyLine(),
            p("Hotel Workflow:", true),
            p("Guest Login karta hai --> Room search karta hai --> Booking confirm karta hai --> Admin Dashboard mein booking dekhta hai --> Guest check-in and check-out karta hai."),

            // 8. IMPORTANT FILES & FOLDERS
            h1("8. IMPORTANT FILES & FOLDERS"),
            createTable(["File / Folder", "Kya kaam karta hai", "Actual Example"], [
                ["server.js", "Backend ka main entry point, server start karta hai.", "app.listen(5000)"],
                [".env", "Passwords aur secret keys ko secure rakhta hai.", "MONGO_URI=..."],
                ["Model/", "Database schemas define karta hai.", "User.js, Room.js"],
                ["routes/", "APIs ke URLs banata hai.", "router.post('/login')"],
                ["controllers/", "Asal logic likhi hoti hai route hit hone par.", "authController.js"],
                ["views/luxury-stay-frontend", "React ka poora frontend isme hai.", "App.jsx"]
            ]),

            // 9. QUICK REVISION
            new Paragraph({ children: [new PageBreak()] }),
            h1("9. QUICK REVISION SHEET"),
            p("Project Name:", true), p("LuxuryStay Hospitality – Hotel Management System"),
            p("Technologies:", true), p("React (UI), Node.js (Server), Express (API), MongoDB (Database), Tailwind (CSS), JWT (Auth)."),
            p("Main Modules:", true), p("Admin Dashboard, Booking/Reservations, Room Management, Staff Portal."),
            p("Authentication:", true), p("JWT (token) aur bcrypt (password hashing)."),
            p("API Flow:", true), p("Frontend -> Routes -> Middleware -> Controller -> Model -> DB."),
            p("Important Tip for Viva:", true),
            p("Agar teacher pooche MERN kyun use kiya? Tou bolna: 'Sir kyunki ye complete JavaScript stack hai, frontend aur backend dono mein JS use hoti hai jisse development fast aur asaan ho jati hai.'")
        ]
    }]
});

// Using a slightly different approach for writing file to avoid busy errors
const outDir = 'C:/Users/Talha/Pictures/LuxuryStay-HMS/docs/viva';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(outDir, 'LuxuryStay_HMS_Roman_English_Viva.docx'), buffer);
    console.log("Roman English Viva DOCX generated successfully!");
});
