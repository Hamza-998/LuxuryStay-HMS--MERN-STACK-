const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'C:/Users/Talha/Pictures/LuxuryStay-HMS/Documentation_Diagrams';

function getMermaidUrl(graph) {
    const state = {
        code: graph,
        mermaid: { 
            theme: 'base',
            themeVariables: {
                primaryColor: '#e6f1fb',
                primaryTextColor: '#0a1628',
                primaryBorderColor: '#185fa5',
                lineColor: '#d97706',
                secondaryColor: '#f9fafb',
                tertiaryColor: '#fff',
                fontFamily: 'Segoe UI, Arial, sans-serif'
            }
        },
        autoSync: true,
        updateDiagram: true
    };
    const jsonStr = JSON.stringify(state);
    const encoded = Buffer.from(jsonStr, 'utf8').toString('base64url');
    return `https://mermaid.ink/img/${encoded}`;
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filename))
                   .on('error', reject)
                   .once('close', () => resolve(filename));
            } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadImage(res.headers.location, filename).then(resolve).catch(reject);
            } else {
                res.resume();
                let errorData = '';
                res.on('data', chunk => errorData += chunk);
                res.on('end', () => reject(new Error(`Failed with ${res.statusCode}: ${errorData}`)));
            }
        }).on('error', reject);
    });
}

const diagrams = {
    '1_System_Architecture.png': `
graph TD
    classDef default fill:#e6f1fb,stroke:#185fa5,stroke-width:2px;
    classDef backend fill:#fff8e6,stroke:#d97706,stroke-width:2px;
    classDef db fill:#f0fff4,stroke:#27ae60,stroke-width:2px;
    
    subgraph Presentation Layer
        UI[React.js Frontend UI]
        Router[React Router DOM]
        State[State Management]
        UI --- Router
        Router --- State
    end

    subgraph Business Logic Layer
        API[RESTful API Routes]:::backend
        AuthMid[JWT Middleware]:::backend
        Controllers[Controllers]:::backend
        Services[External Services]:::backend
        
        API --> AuthMid
        AuthMid --> Controllers
        Controllers --> Services
    end

    subgraph Data Access Layer
        Mongoose[Mongoose ODM]:::db
        Models[Data Models]:::db
        
        Controllers --> Mongoose
        Mongoose --> Models
    end

    subgraph Cloud Infrastructure
        DB[(MongoDB Atlas)]:::db
        Cloudinary[(Cloudinary)]:::backend
    end

    State -->|HTTP / Axios| API
    Models -->|Read/Write| DB
    Services -->|Images| Cloudinary
`,
    '2_ER_Diagram.png': `
erDiagram
    USERS ||--o{ RESERVATIONS : makes
    ROOMS ||--o{ RESERVATIONS : booked_for
    ROOMS ||--o{ MAINTENANCETASKS : requires
    STAFF ||--o{ MAINTENANCETASKS : assigned_to
    
    USERS {
        ObjectId _id PK
        string fullName
        string role
    }
    ROOMS {
        ObjectId _id PK
        string roomNumber
        string type
        number pricePerNight
    }
    RESERVATIONS {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId roomId FK
        date checkInDate
        string bookingStatus
    }
    STAFF {
        ObjectId _id PK
        string fullName
        string role
        string shift
    }
    MAINTENANCETASKS {
        ObjectId _id PK
        string issueType
        string status
    }
`,
    '3_Use_Case.png': `
usecaseDiagram
    actor Admin
    actor Guest
    actor Staff
    
    package "LuxuryStay HMS" {
        usecase "View Analytics Dashboard" as UC1
        usecase "Manage Room Inventory" as UC2
        usecase "Assign Maintenance Tasks" as UC4
        
        Admin --> UC1
        Admin --> UC2
        Admin --> UC4
        
        usecase "Search Available Rooms" as UC7
        usecase "Book Room" as UC8
        usecase "View Booking History" as UC9
        
        Guest --> UC7
        Guest --> UC8
        Guest --> UC9
        
        usecase "Login to Staff Portal" as UC12
        usecase "Update Task Status" as UC14
        
        Staff --> UC12
        Staff --> UC14
    }
`,
    '4_DFD.png': `
graph TD
    classDef default fill:#e6f1fb,stroke:#185fa5,stroke-width:2px;
    classDef store fill:#f0fff4,stroke:#27ae60,stroke-width:2px;
    classDef process fill:#fff8e6,stroke:#d97706,stroke-width:2px,shape:circle;

    Guest((Guest))
    Admin((Admin))
    Staff((Staff))
    
    P1(1.0 Auth)
    P2(2.0 Rooms)
    P3(3.0 Booking)
    P4(4.0 Tasks)
    
    D1[(D1: Users)]:::store
    D2[(D2: Rooms)]:::store
    D3[(D3: Books)]:::store
    D4[(D4: Tasks)]:::store
    
    Guest -->|Login| P1
    P1 <-->|Verify| D1
    P1 -->|JWT| Guest
    
    Admin -->|Manage| P2
    P2 <-->|Update| D2
    
    Guest -->|Select Room| P3
    P3 -->|Save| D3
    P3 -->|Confirm| Guest
    
    Admin -->|Assign| P4
    P4 -->|Save| D4
    Staff -->|Update| P4
`,
    '5_Complete_Workflow.png': `
sequenceDiagram
    autonumber
    actor Guest
    participant Frontend
    participant API
    participant Database
    
    Guest->>Frontend: Click "Book Room"
    Frontend->>API: POST /api/reservations
    API->>Database: Check for overlapping dates
    
    alt Dates Available
        Database-->>API: No conflict
        API->>Database: Create Reservation Record
        API->>Database: Update Room Status
        API-->>Frontend: 201 Created (Success)
        Frontend-->>Guest: Show Success Alert
    else Dates Unavailable
        Database-->>API: Conflict found
        API-->>Frontend: 400 Bad Request
        Frontend-->>Guest: Show Error Alert
    end
`,
    '6_Auth_Sequence.png': `
sequenceDiagram
    autonumber
    actor User
    participant Frontend
    participant API
    participant DB
    
    User->>Frontend: Enter Email & Password
    Frontend->>API: POST /api/users/login
    API->>DB: Query User by Email
    DB-->>API: User Data (Hashed Pass)
    API->>API: Compare bcrypt Hash
    
    alt Password Match
        API->>API: Generate JWT Token
        API-->>Frontend: 200 OK + JWT
        Frontend->>Frontend: Store in localStorage
        Frontend-->>User: Redirect to Dashboard
    else Password Mismatch
        API-->>Frontend: 401 Unauthorized
        Frontend-->>User: Show Error Message
    end
`,
    '7_RBAC_Flow.png': `
graph TD
    classDef default fill:#e6f1fb,stroke:#185fa5,stroke-width:2px;
    classDef error fill:#fff0f0,stroke:#c0392b,stroke-width:2px;
    classDef success fill:#f0fff4,stroke:#27ae60,stroke-width:2px;

    User[User accesses Protected Route]
    Guard{Frontend Guard / API Middleware}
    
    User --> Guard
    Guard -->|No Token| Deny[Redirect to Login]:::error
    Guard -->|Valid Token| Decode[Decode JWT Role]
    
    Decode -->|admin| Admin[Admin Granted]:::success
    Admin --> AdminRoutes[Dashboard, Manage Users]
    
    Decode -->|staff| Staff[Staff Granted]:::success
    Staff --> StaffRoutes[View Assigned Tasks]
    
    Decode -->|guest| Guest[Guest Granted]:::success
    Guest --> GuestRoutes[My Bookings]
    
    AdminRoutes -.->|Cannot access| Deny
`
};

async function generateImages() {
    for (const [filename, graph] of Object.entries(diagrams)) {
        try {
            console.log(`Generating ${filename}...`);
            const url = getMermaidUrl(graph.trim());
            const filepath = path.join(dir, filename);
            await downloadImage(url, filepath);
            console.log(`Successfully saved ${filename}`);
        } catch (error) {
            console.error(`Error generating ${filename}:`, error.message);
        }
    }
}

generateImages();
