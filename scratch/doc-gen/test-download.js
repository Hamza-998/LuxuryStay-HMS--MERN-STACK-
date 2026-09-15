const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'C:/Users/Talha/Pictures/LuxuryStay-HMS/Documentation_Diagrams';

function getMermaidUrl(graph) {
    const state = {
        code: graph,
        mermaid: { theme: 'default' },
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
    UI[Frontend] --> API[Node.js API]
    API --> DB[(MongoDB)]
`,
    '2_ER_Diagram.png': `
erDiagram
    USERS ||--o{ RESERVATIONS : makes
    ROOMS ||--o{ RESERVATIONS : booked_for
`
};

async function generateImages() {
    for (const [filename, graph] of Object.entries(diagrams)) {
        try {
            console.log(`Generating ${filename}...`);
            const url = getMermaidUrl(graph.trim());
            console.log("URL:", url);
            const filepath = path.join(dir, filename);
            await downloadImage(url, filepath);
            console.log(`Successfully saved ${filename}`);
        } catch (error) {
            console.error(`Error generating ${filename}:`, error.message);
        }
    }
}

generateImages();
