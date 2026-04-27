const fs = require('fs');
const path = require('path');

async function run() {
    console.log("🚀 Vulture Engine: Building 10K Matrix...");
    
    const baseDir = path.join(process.cwd(), 'archives');
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

    const template = fs.readFileSync('blog.html', 'utf8');
    const newsData = JSON.parse(fs.readFileSync('rss_data.json', 'utf8') || "[]");

    const niches = ["Real Estate", "SaaS", "Crypto", "Travel", "Legal"];
    const cities = ["London", "New-York", "Tokyo", "Berlin", "Austin", "Miami"];

    for (let niche of niches) {
        const subDir = path.join(baseDir, niche.toLowerCase());
        if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });

        for (let city of cities) {
            const headline = newsData[Math.floor(Math.random() * newsData.length)]?.title || "Market Update 2026";
            
            let page = template
                .replace(/{{niche}}/g, niche)
                .replace(/{{location}}/g, city)
                .replace(/{{headline}}/g, headline)
                .replace(/{{date}}/g, new Date().toDateString());

            // Ensure our affiliate.js can find and swap the links
            page = page.replace('class="cta-button"', 'class="cta-button vulture-link"');

            fs.writeFileSync(path.join(subDir, `${city.toLowerCase()}.html`), page);
        }
    }
    console.log("✅ Build complete.");
}

run().catch(err => { console.error(err); process.exit(1); });
