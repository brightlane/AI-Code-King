const fs = require('fs');
const path = require('path');

// Matrix data
const niches = ["Real Estate", "SaaS", "Crypto", "Travel", "Marketing", "Fitness"];
const cities = ["New-York", "London", "Tokyo", "Berlin", "Austin", "Miami", "Toronto"];

async function run() {
    const template = fs.readFileSync('blog.html', 'utf8');
    const news = JSON.parse(fs.readFileSync('rss_data.json', 'utf8') || "[]");

    console.log("🚀 Vulture Matrix Scaling Started...");

    for (let niche of niches) {
        const dir = path.join('archives', niche.toLowerCase());
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        for (let city of cities) {
            // Grab a random news item to make the page unique for SEO
            const dailyHeadline = news[Math.floor(Math.random() * news.length)] || { title: "Global Productivity Update" };

            let page = template
                .replace(/{{niche}}/g, niche)
                .replace(/{{location}}/g, city)
                .replace(/{{headline}}/g, dailyHeadline.title)
                .replace(/{{date}}/g, new Date().toDateString());

            // Ensure the affiliate.js class is present
            page = page.replace('class="cta-button"', 'class="cta-button vulture-link"');

            fs.writeFileSync(path.join(dir, `${city.toLowerCase()}.html`), page);
        }
    }
    console.log("✅ 10K Matrix Step Complete.");
}

run().catch(err => { console.error(err); process.exit(1); });
