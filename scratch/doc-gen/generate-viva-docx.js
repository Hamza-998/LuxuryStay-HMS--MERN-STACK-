const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType, PageBreak } = require('docx');

// Helper to create paragraphs
function createHeading(text, level = HeadingLevel.HEADING_1) {
    return new Paragraph({
        text: text,
        heading: level,
        spacing: { before: 400, after: 200 }
    });
}

function createText(text, bold = false) {
    return new Paragraph({
        children: [new TextRun({ text: text, bold: bold, size: 24 })],
        spacing: { after: 120 }
    });
}

function createQandA(q, a) {
    return [
        new Paragraph({
            children: [new TextRun({ text: q, bold: true, size: 24 })],
            spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
            children: [new TextRun({ text: a, size: 24 })],
            spacing: { after: 200 }
        })
    ];
}

function createBullet(text) {
    return new Paragraph({
        children: [new TextRun({ text: text, size: 24 })],
        bullet: { level: 0 },
        spacing: { after: 120 }
    });
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

const doc = new Document({
    sections: [{
        properties: { page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } } },
        children: [
            createHeading("LuxuryStay HMS - Simple Viva Practice Sheet", HeadingLevel.TITLE),
            createText("This sheet is designed for quick and easy Viva preparation."),
            
            // 1. Technologies Used
            createHeading("1. Technologies Used", HeadingLevel.HEADING_1),
            createText("Technology: React.js", true),
            createText("What is it? A JavaScript library for building user interfaces."),
            createText("Where used? In the 'views/luxury-stay-frontend' folder for the whole frontend."),
            createText("Why is it used? To make a fast, Single Page Application (SPA)."),
            createText("Viva Answer: Sir, React is used to make the frontend of our website fast and interactive without page reloads."),
            
            createText("Technology: Node.js", true),
            createText("What is it? A runtime environment to run JavaScript on the server."),
            createText("Where used? In the main project folder (Backend)."),
            createText("Why is it used? To run the backend API server."),
            createText("Viva Answer: Sir, Node.js is used to handle our backend operations and server logic."),
            
            createText("Technology: Express.js", true),
            createText("What is it? A framework for Node.js."),
            createText("Where used? In the 'server.js' and 'routes' folder."),
            createText("Why is it used? To easily create APIs and manage routes."),
            createText("Viva Answer: Sir, Express is used inside Node.js to create our REST APIs and handle HTTP requests easily."),
            
            createText("Technology: MongoDB", true),
            createText("What is it? A NoSQL database."),
            createText("Where used? MongoDB Atlas (Cloud) connected via 'server.js'."),
            createText("Why is it used? To store our data like users, rooms, and bookings in JSON format."),
            createText("Viva Answer: Sir, MongoDB is our database where we store all hotel records in flexible document format."),
            
            createText("Technology: Mongoose", true),
            createText("What is it? An ODM (Object Data Modeling) library for MongoDB."),
            createText("Where used? In the 'Model' folder (e.g., User.js, Room.js)."),
            createText("Why is it used? To create database schemas and interact with MongoDB easily."),
            createText("Viva Answer: Sir, Mongoose is used to define models and connect our Node.js app with MongoDB."),
            
            createText("Technology: JWT (JSON Web Token)", true),
            createText("What is it? A secure string used for authentication."),
            createText("Where used? In 'controllers/authController.js' and 'middleware/authMiddleware.js'."),
            createText("Why is it used? To keep the user logged in securely."),
            createText("Viva Answer: Sir, JWT is used to securely authenticate users after they login. (Yeh secure token hai jo login ke baad milta hai)."),

            // 2. Project Modules
            createHeading("2. Project Modules", HeadingLevel.HEADING_1),
            createBullet("Login / Authentication: Allows Admin, Staff, and Guests to login securely using JWT."),
            createBullet("Admin Dashboard: The main panel where Admins can see total revenue, bookings, and guests."),
            createBullet("Room Management: Admin can add, update, and delete hotel rooms and set their prices."),
            createBullet("Reservation / Booking: Guests can search for rooms and book them for specific dates."),
            createBullet("Staff & Maintenance: Admin can assign cleaning or repair tasks to staff, and staff can update the status."),

            // 3. Important Files & Folders
            createHeading("3. Important Files & Folders", HeadingLevel.HEADING_1),
            createTable(["File / Folder", "What it does"], [
                ["server.js", "Main backend file. Starts the server and connects to the database."],
                [".env", "Stores secret keys like Database URI and JWT secret securely."],
                ["/Model folder", "Contains database schemas (how data looks) like User, Room, Booking."],
                ["/routes folder", "Defines the API URLs (endpoints) like /api/rooms."],
                ["/controllers folder", "Contains actual logic (what happens when a route is hit)."],
                ["/views/luxury-stay-frontend", "This entire folder contains our React Frontend project."],
                ["App.jsx (Frontend)", "Main React file that handles website routing (pages)."],
                ["api.js (Frontend)", "Contains Axios setup to send requests to our backend."]
            ]),

            // 4. Simple Project Workflow
            createHeading("4. Simple Project Workflow", HeadingLevel.HEADING_1),
            createText("How the technical flow works:", true),
            createText("Frontend (React) sends a request → Backend API (Express) receives it → Controller processes logic → Mongoose saves/fetches from Database (MongoDB) → Backend sends response back → Frontend shows it to the user."),
            createText("How the Hotel flow works:", true),
            createText("Guest Registers/Logins → Searches Room → Selects Dates → Books Room → Admin Sees Booking in Dashboard → Guest Checks Out."),

            // 5. Short Viva Questions & Answers
            createHeading("5. Short Viva Questions & Answers", HeadingLevel.HEADING_1),
            ...createQandA("Q1: What is your project name?", "My project name is LuxuryStay Hospitality – Hotel Management System."),
            ...createQandA("Q2: What is the purpose of your project?", "To digitize and manage hotel bookings, rooms, and staff easily. (Yeh hotel ki bookings aur staff ko easily manage karne ke liye banaya gaya hai)."),
            ...createQandA("Q3: What technologies are used in this project?", "We used MERN stack. MongoDB for database, Express and Node for backend, and React for frontend."),
            ...createQandA("Q4: What is React?", "It is a JavaScript library used to build user interfaces (frontend)."),
            ...createQandA("Q5: Why is React used in your project?", "To make our website fast and interactive as a Single Page Application (SPA). (Taake page bar bar load na ho aur website fast chale)."),
            ...createQandA("Q6: What is a Component in React?", "A component is a reusable piece of UI. For example, a Navbar or a Button."),
            ...createQandA("Q7: What is useState?", "It is a React Hook used to store and manage variables/data inside a component. (Yeh data ko save karta hai jab tak page open hai)."),
            ...createQandA("Q8: What is useEffect?", "It is a React Hook used to perform side effects, like fetching data from an API when the page loads."),
            ...createQandA("Q9: What is Node.js?", "It is a runtime environment that allows us to run JavaScript on the server (backend)."),
            ...createQandA("Q10: What is Express.js?", "It is a framework for Node.js used to easily create APIs and manage routes."),
            ...createQandA("Q11: What is the difference between React and Express?", "React is for the frontend (what user sees), Express is for the backend (logic and API)."),
            ...createQandA("Q12: What is MongoDB?", "It is a NoSQL database where we save our data in document format (JSON style)."),
            ...createQandA("Q13: Why is MongoDB used?", "Because it is very flexible and works perfectly with JavaScript (MERN stack)."),
            ...createQandA("Q14: What is Mongoose?", "It is a library that helps Node.js connect with MongoDB and define schemas (structure of data)."),
            ...createQandA("Q15: What is an API?", "API stands for Application Programming Interface. It acts as a bridge between frontend and backend. (Yeh frontend ka message backend tak le kar jati hai)."),
            ...createQandA("Q16: What is Axios?", "It is a library used in React to send API requests to the backend (GET, POST, PUT, DELETE)."),
            ...createQandA("Q17: What is JWT?", "JWT (JSON Web Token) is a secure token used for user authentication after login. (Login verify karne ke liye use hota hai)."),
            ...createQandA("Q18: What is bcrypt?", "It is a library used to encrypt/hash user passwords before saving them in the database for security."),
            ...createQandA("Q19: What is CRUD?", "It stands for Create, Read, Update, Delete. These are basic operations of our database."),
            ...createQandA("Q20: How does data save in MongoDB?", "Frontend sends data via Axios POST request -> Express API receives it -> Mongoose saves it into MongoDB."),
            ...createQandA("Q21: What are the main modules in your project?", "Admin Dashboard, Room Management, Reservation, and Staff Tasks."),
            ...createQandA("Q22: What did you use for authentication?", "We used JWT (JSON Web Tokens) for authentication."),
            ...createQandA("Q23: How do you handle images in your project?", "We used Cloudinary to upload and store room images in the cloud."),
            ...createQandA("Q24: What is Tailwind CSS?", "It is a utility-first CSS framework used to quickly style our React components. (CSS design ko asan aur fast banane ke liye)."),
            ...createQandA("Q25: What is a Schema in Mongoose?", "It defines the structure of the database document. Like User schema has email, password, and role."),
            ...createQandA("Q26: What is a Route in Express?", "A route is a URL path like '/api/rooms' that triggers a specific function in the backend."),
            ...createQandA("Q27: What is a Controller?", "Controller contains the main logic of the route. E.g., verifying data and saving it to the database."),
            ...createQandA("Q28: What is Middleware?", "Middleware is a function that runs between the request and the controller. E.g., checking if the JWT token is valid."),
            ...createQandA("Q29: How do you protect an Admin route?", "We use an auth middleware that checks the JWT token to see if the user role is 'admin'. (Sirf admin token walay ko pass hone deta hai)."),
            ...createQandA("Q30: What is CORS?", "Cross-Origin Resource Sharing. It allows our React frontend (port 5173) to securely talk to our Node backend (port 5000)."),
            ...createQandA("Q31: What is props in React?", "Props are used to pass data from a parent component to a child component."),
            ...createQandA("Q32: What is the Virtual DOM?", "React uses a Virtual DOM to update only the changed parts of the website, making it very fast."),
            ...createQandA("Q33: What is the .env file?", "It is a hidden file used to store sensitive keys like Database passwords and JWT secrets securely."),
            ...createQandA("Q34: What is package.json?", "It is a file that keeps track of all the libraries (dependencies) installed in our project."),
            ...createQandA("Q35: What happens when a guest books a room?", "The backend checks if the room is available for those dates. If yes, it saves the booking in the DB and marks the room as occupied."),

            // 6. Code Understanding
            createHeading("6. Code Understanding", HeadingLevel.HEADING_1),
            createBullet("App.jsx: This is the main router file. It decides which page to open based on the URL."),
            createBullet("server.js: This is the starting point of the backend. It connects to MongoDB and starts listening for API requests."),
            createBullet("Model/User.js: Defines what user data we save (name, email, password, role)."),
            createBullet("routes/roomRoutes.js: Contains the API endpoints for rooms (like adding a room or getting all rooms)."),
            createBullet("controllers/authController.js: Contains the logic for registering and logging in users (hashing passwords, creating tokens)."),
            createBullet("middleware/auth.js: Checks if the incoming request has a valid JWT token before allowing access to private data."),

            // 7. Quick Revision
            new Paragraph({ children: [new PageBreak()] }),
            createHeading("7. Quick Revision Sheet", HeadingLevel.HEADING_1),
            createText("Project Name: LuxuryStay Hospitality – Hotel Management System"),
            createText("Frontend Tech: React.js, Tailwind CSS, Axios"),
            createText("Backend Tech: Node.js, Express.js"),
            createText("Database: MongoDB (with Mongoose)"),
            createText("Authentication: JWT (JSON Web Tokens)"),
            createText("Main Modules: Admin Panel, Guest Booking, Room Inventory, Staff Maintenance"),
            createText("Core Concept (MERN): MongoDB (Database) -> Express (Backend API) -> React (Frontend UI) -> Node (Backend Runtime)"),
            emptyLine(),
            createText("Good Luck with your Viva! Remember to keep your answers simple, confident, and to the point.", true)
        ]
    }]
});

function emptyLine() {
    return new Paragraph({ text: "" });
}

const outDir = 'C:/Users/Talha/Pictures/LuxuryStay-HMS/docs/viva';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(outDir, 'LuxuryStay_HMS_Simple_Viva_Practice.docx'), buffer);
    console.log("Viva DOCX generated successfully!");
});
