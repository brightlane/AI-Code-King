const fs = require('fs');
const path = require('path');

async function run() {
    console.log("🚀 Vulture Engine: Starting 50-Page Batch...");
    
    const archivesDir = path.join(process.cwd(), 'archives');
    if (!fs.existsSync(archivesDir)) {
        fs.mkdirSync(archivesDir, { recursive: true });
    }

    const templatePath = path.join(process.cwd(), 'blog.html');
    if (!fs.existsSync(templatePath)) {
        console.error("❌ blog.html template missing!");
        process.exit(1);
    }

    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Vulture Logic: Create 50 unique pages per run
    for (let i = 1; i <= 50; i++) {
        const timestamp = new Date().getTime();
        const pageID = `${timestamp}-${i}`;
        
        let content = template
            .replace(/{{niche}}/g, "Productivity Automation") // Replace with dynamic niches later
            .replace(/{{location}}/g, "Global")
            .replace(/{{date}}/g, new Date().toLocaleDateString());

        // Ensure affiliate.js can find these links
        content = content.replace('class="cta-button"', 'class="cta-button vulture-link"');

        const fileName = `vulture-seo-page-${pageID}.html`;
        fs.writeFileSync(path.join(archivesDir, fileName), content);
        
        if (i % 10 === 0) console.log(`...Generated ${i} pages`);
    }
    
    console.log("✅ Batch Complete: 50 pages ready for deployment.");
}

run().catch(err => {
    console.error("Vulture Engine Error:", err);
    process.exit(1);
});
