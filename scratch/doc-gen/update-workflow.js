const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Talha/Pictures/LuxuryStay-HMS/Documentation_Diagrams';
const fullPath = path.join(dir, '5_Complete_Workflow.txt');

const improvedCode = `sequenceDiagram
    autonumber
    actor G as Guest
    participant F as React Frontend
    participant A as Express API
    participant D as MongoDB Database
    
    G->>F: Enter Search Criteria (Dates, Room Type)
    F->>A: GET /api/rooms/search
    A->>D: Query available rooms (excluding booked dates)
    D-->>A: Return Room Documents
    A-->>F: JSON Array of Rooms
    F-->>G: Display Available Rooms
    
    G->>F: Select Room & Click "Book Now"
    F->>F: Check local Auth State (JWT)
    
    alt Not Logged In
        F-->>G: Redirect to Login Page
    else Logged In
        F->>A: POST /api/reservations {roomId, dates}
        A->>A: Verify JWT Token Middleware
        A->>D: Find overlapping reservations
        
        alt Overlapping Dates Found
            D-->>A: Conflict Exists
            A-->>F: 400 Bad Request (Room Unavailable)
            F-->>G: Show Error Notification
        else Dates Available
            D-->>A: No Conflicts
            A->>D: Insert Reservation (Status: Confirmed)
            A->>D: Update Room Status (Occupied)
            D-->>A: Success
            A-->>F: 201 Created (Reservation Data)
            F-->>G: Show Success Alert & Redirect to "My Bookings"
        end
    end`;

fs.writeFileSync(fullPath, improvedCode, { encoding: 'utf8' });
console.log("5_Complete_Workflow.txt has been successfully updated with improved code.");
