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

const usecaseGraph = `
graph LR
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
    end
`;

async function fixUseCase() {
    // Write fixed txt file
    fs.writeFileSync(path.join(dir, '3_Use_Case.txt'), '```mermaid\n' + usecaseGraph.trim() + '\n```');
    
    // Generate png
    try {
        console.log("Generating 3_Use_Case.png...");
        const url = getMermaidUrl(usecaseGraph.trim());
        await downloadImage(url, path.join(dir, '3_Use_Case.png'));
        console.log("Successfully saved 3_Use_Case.png");
    } catch (error) {
        console.error("Error generating 3_Use_Case.png:", error.message);
    }
}

fixUseCase();
