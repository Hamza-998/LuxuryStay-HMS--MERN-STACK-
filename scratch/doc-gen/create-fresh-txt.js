const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Talha/Pictures/LuxuryStay-HMS/Documentation_Diagrams';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const diagrams = {
    '1_System_Architecture.txt': `graph TD
    %% LuxuryStay System Architecture
    
    subgraph Presentation Layer
        UI[React.js Frontend UI]
        Router[React Router DOM]
        State[State Management / Hooks]
        UI --- Router
        Router --- State
    end

    subgraph Business Logic Layer (Node.js & Express)
        API[RESTful API Routes]
        AuthMid[JWT Authentication Middleware]
        Controllers[Business Controllers]
        Services[External API Services]
        
        API --> AuthMid
        AuthMid --> Controllers
        Controllers --> Services
    end

    subgraph Data Access Layer
        Mongoose[Mongoose ODM]
        Models[Data Models & Schemas]
        
        Controllers --> Mongoose
        Mongoose --> Models
    end

    subgraph Cloud Infrastructure
        DB[(MongoDB Atlas NoSQL Database)]
        Cloudinary[(Cloudinary Media Storage)]
    end

    %% Connections
    State -->|HTTP Requests / Axios| API
    Models -->|Read/Write Data| DB
    Services -->|Upload/Fetch Images| Cloudinary`,

    '2_ER_Diagram.txt': `erDiagram
    %% LuxuryStay ER Diagram
    
    USERS ||--o{ RESERVATIONS : makes
    USERS ||--o{ FEEDBACKS : writes
    USERS ||--o{ SERVICEREQUESTS : requests
    ROOMS ||--o{ RESERVATIONS : booked_for
    ROOMS ||--o{ MAINTENANCETASKS : requires
    STAFF ||--o{ MAINTENANCETASKS : assigned_to
    STAFF ||--o{ SERVICEREQUESTS : handles
    
    USERS {
        ObjectId _id PK
        string fullName
        string email
        string password
        string role "admin/guest/staff"
        string status
        date createdAt
    }
    
    ROOMS {
        ObjectId _id PK
        string roomNumber
        string type "Single/Double/Suite"
        number pricePerNight
        number capacity
        string floor
        string status "available/occupied/maintenance"
        string cleaningStatus "Clean/Dirty/In Progress"
        array images "Cloudinary URLs"
        array features
    }
    
    RESERVATIONS {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId roomId FK
        date checkInDate
        date checkOutDate
        number totalAmount
        string paymentStatus
        string bookingStatus "Pending/Confirmed/Cancelled/Completed"
        date createdAt
    }
    
    STAFF {
        ObjectId _id PK
        ObjectId userId FK "Optional link to user account"
        string fullName
        string email
        string phone
        string role "Housekeeping/Maintenance/Manager"
        string shift "Morning/Evening/Night"
        number salary
        date hireDate
    }
    
    MAINTENANCETASKS {
        ObjectId _id PK
        ObjectId roomId FK
        ObjectId assignedTo FK
        string issueType "Cleaning/Repair/Other"
        string description
        string priority "Low/Medium/High/Urgent"
        string status "Pending/In Progress/Resolved"
    }
    
    SERVICEREQUESTS {
        ObjectId _id PK
        ObjectId guestId FK
        ObjectId roomId FK
        ObjectId assignedTo FK
        string serviceType
        string description
        date requestedTime
        string status "Pending/In Progress/Completed/Cancelled"
    }`,

    '3_Use_Case.txt': `graph LR
    classDef default fill:#e6f1fb,stroke:#185fa5,stroke-width:2px;
    classDef actor fill:#f9fafb,stroke:#0a1628,stroke-width:2px,shape:circle;
    classDef usecase fill:#fff8e6,stroke:#d97706,stroke-width:2px,shape:rect;

    Admin((Admin)):::actor
    Guest((Guest)):::actor
    Staff((Staff)):::actor
    
    subgraph LuxuryStay_HMS
        UC1([View Analytics Dashboard]):::usecase
        UC2([Manage Room Inventory]):::usecase
        UC4([Assign Maintenance Tasks]):::usecase
        
        Admin --> UC1
        Admin --> UC2
        Admin --> UC4
        
        UC7([Search Available Rooms]):::usecase
        UC8([Book Room]):::usecase
        UC9([View Booking History]):::usecase
        
        Guest --> UC7
        Guest --> UC8
        Guest --> UC9
        
        UC12([Login to Staff Portal]):::usecase
        UC14([Update Task Status]):::usecase
        
        Staff --> UC12
        Staff --> UC14
    end`,

    '4_DFD.txt': `graph TD
    %% LuxuryStay Level 1 DFD
    
    Guest((Guest))
    Admin((Admin))
    Staff((Staff))
    
    subgraph System Processes
        P1(1.0 User Authentication)
        P2(2.0 Room Search & Management)
        P3(3.0 Reservation Management)
        P4(4.0 Task & Maintenance Assignment)
    end
    
    subgraph Data Stores
        D1[(D1: Users DB)]
        D2[(D2: Rooms DB)]
        D3[(D3: Reservations DB)]
        D4[(D4: Tasks DB)]
    end
    
    %% Process 1: Auth
    Guest -->|Login Credentials| P1
    Admin -->|Login Credentials| P1
    Staff -->|Login Credentials| P1
    P1 <-->|Verify Data| D1
    P1 -->|JWT Token| Guest
    
    %% Process 2: Rooms
    Guest -->|Search Query| P2
    Admin -->|Add/Edit Room Info| P2
    P2 <-->|Fetch/Update Rooms| D2
    P2 -->|Room Availability Details| Guest
    
    %% Process 3: Reservation
    Guest -->|Selected Room & Dates| P3
    P3 -->|Check Dates| D3
    P3 -->|Update Status| D2
    P3 -->|Store Booking| D3
    P3 -->|Booking Confirmation| Guest
    Admin -->|Cancel/Update Booking| P3
    
    %% Process 4: Tasks
    Admin -->|Assign Task| P4
    P4 -->|Store Task| D4
    P4 -->|Task Details| Staff
    Staff -->|Update Task Status| P4
    P4 -->|Update DB| D4`,

    '5_Complete_Workflow.txt': `sequenceDiagram
    autonumber
    actor Guest
    participant Frontend (React)
    participant Backend (Express API)
    participant Database (MongoDB)
    
    Guest->>Frontend (React): Search available rooms for dates
    Frontend (React)->>Backend (Express API): GET /api/rooms/available
    Backend (Express API)->>Database (MongoDB): Query available rooms
    Database (MongoDB)-->>Backend (Express API): Return Room List
    Backend (Express API)-->>Frontend (React): Rooms JSON
    Frontend (React)-->>Guest: Display available rooms
    
    Guest->>Frontend (React): Click "Book Room" & Confirm
    Frontend (React)->>Backend (Express API): POST /api/reservations (JWT, RoomId, Dates)
    
    Backend (Express API)->>Backend (Express API): Validate JWT Token
    Backend (Express API)->>Database (MongoDB): Check for overlapping dates
    
    alt Dates Available
        Database (MongoDB)-->>Backend (Express API): No conflict
        Backend (Express API)->>Database (MongoDB): Create Reservation Record (Status: Pending)
        Backend (Express API)->>Database (MongoDB): Update Room Status (Occupied)
        Database (MongoDB)-->>Backend (Express API): Success
        Backend (Express API)-->>Frontend (React): 201 Created (Booking Details)
        Frontend (React)-->>Guest: Show Success Alert & Redirect to My Bookings
    else Dates Unavailable
        Database (MongoDB)-->>Backend (Express API): Conflict found
        Backend (Express API)-->>Frontend (React): 400 Bad Request (Room already booked)
        Frontend (React)-->>Guest: Show Error Alert (Please select other dates)
    end`,

    '6_Auth_Sequence.txt': `sequenceDiagram
    autonumber
    actor User
    participant React App
    participant Auth Controller
    participant User Model
    participant Database
    
    User->>React App: Enter Email and Password
    React App->>Auth Controller: POST /api/users/login (email, password)
    Auth Controller->>User Model: Find user by email
    User Model->>Database: Query DB
    
    alt User Not Found
        Database-->>User Model: Null
        User Model-->>Auth Controller: Null
        Auth Controller-->>React App: 401 Unauthorized (Invalid email or password)
        React App-->>User: Display Error Message
    else User Found
        Database-->>User Model: User Document (including hashed password)
        User Model-->>Auth Controller: User Object
        Auth Controller->>Auth Controller: bcrypt.compare(enteredPassword, hashedPassword)
        
        alt Password Mismatch
            Auth Controller-->>React App: 401 Unauthorized (Invalid email or password)
            React App-->>User: Display Error Message
        else Password Match
            Auth Controller->>Auth Controller: jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'})
            Auth Controller-->>React App: 200 OK { token, user: {id, role, name} }
            React App->>React App: Store JWT in localStorage
            React App->>React App: Update Auth Context State
            
            alt Role == Admin
                React App-->>User: Redirect to Admin Dashboard
            else Role == Staff
                React App-->>User: Redirect to Staff Portal
            else Role == Guest
                React App-->>User: Redirect to Homepage / My Bookings
            end
        end
    end`,

    '7_RBAC_Flow.txt': `graph TD
    %% Role Based Access Control (RBAC) Flow
    
    User[User attempts to access Protected Route]
    Guard{Frontend Route Guard / Backend Middleware}
    
    User --> Guard
    
    Guard -->|No Token / Invalid Token| Deny[Redirect to Login / 401 Unauthorized]
    
    Guard -->|Valid Token| Decode[Decode JWT & Check 'role' property]
    
    Decode -->|role === 'admin'| Admin[Admin Access Granted]
    Admin --> AdminRoutes[Manage Rooms, View Dashboard, Manage Users, Assign Tasks]
    
    Decode -->|role === 'staff'| Staff[Staff Access Granted]
    Staff --> StaffRoutes[View Assigned Maintenance Tasks, Update Task Status]
    
    Decode -->|role === 'guest'| Guest[Guest Access Granted]
    Guest --> GuestRoutes[Book Rooms, View Own Reservations, Submit Feedback]
    
    %% Restricting Cross-Access
    AdminRoutes -.->|Admin cannot book rooms natively| Deny
    StaffRoutes -.->|Staff cannot manage inventory| Deny
    GuestRoutes -.->|Guest cannot view dashboard| Deny`
};

Object.entries(diagrams).forEach(([filename, content]) => {
    const fullPath = path.join(dir, filename);
    // Write purely in utf8
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
});

console.log("All files freshly created!");
