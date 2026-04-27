const fs = require('fs');
const path = require('path');

async function run() {
    const archivesDir = path.join(process.cwd(), 'archives');
    
    // CRITICAL: Create the directory BEFORE writing files
    if (!fs.existsSync(archivesDir)) {
        fs.mkdirSync(archivesDir, { recursive: true });
        console.log("📁 Created /archives folder");
    }

    const templatePath = path.join(process.cwd(), 'blog.html');
    if (!fs.existsSync(templatePath)) {
        console.error("❌ blog.html is missing from root!");
        process.exit(1);
    }

    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Test run of 5 pages
    for (let i = 1; i <= 5; i++) {
        const fileName = `page-${i}.html`;
        fs.writeFileSync(path.join(archivesDir, fileName), template);
        console.log(`✅ Created ${fileName}`);
    }
}

run().catch(err => { console.error(err); process.exit(1); });
