/**
 * VULTURE ENGINE - GENERATOR (STABLE VERSION)
 * No imports, no module errors.
 */

const fs = require('fs');
const path = require('path');

async function generateVulturePages() {
    console.log("🚀 Vulture Engine: Initializing Build #6...");

    const niches = ["Remote Work", "SEO Automation", "SaaS Growth", "Crypto Tools", "AI Content"];
    const locations = ["Global", "USA", "UK", "Europe", "Asia"];

    // 1. Load the Template
    const templatePath = path.join(process.cwd(), 'blog.html');
    
    if (!fs.existsSync(templatePath)) {
        console.error("❌ Error: blog.html template missing!");
        return;
    }

    let template = fs.readFileSync(templatePath, 'utf8');

    // 2. The Generation Loop
    for (let niche of niches) {
        for (let loc of locations) {
            let pageContent = template
                .replace(/{{niche}}/g, niche)
                .replace(/{{location}}/g, loc)
                .replace(/{{date}}/g, new Date().toDateString());

            // Inject the necessary class for your affiliate.js and yield_optimizer.js
            pageContent = pageContent.replace('class="cta-button"', 'class="cta-button vulture-link"');

            const fileName = `blog-${niche.toLowerCase().replace(/\s+/g, '-')}-${loc.toLowerCase()}.html`;
            
            // Ensure the directory exists
            const dir = path.join(process.cwd(), 'archives');
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);

            const filePath = path.join(dir, fileName);
            fs.writeFileSync(filePath, pageContent);
            
            console.log(`✅ Success: ${fileName}`);
        }
    }
}

generateVulturePages().catch(err => {
    console.error("Vulture Crash:", err);
    process.exit(1);
});
