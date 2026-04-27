import fs from 'fs';
import path from 'path';

async function generateVulturePages() {
    console.log("🚀 Vulture Engine: Initializing...");

    // 1. Data Source (In a real scenario, this comes from your trends.js/rss.js output)
    const niches = ["Remote Work", "SEO Automation", "SaaS Growth", "Crypto Tools", "AI Content"];
    const locations = ["Global", "USA", "UK", "Europe", "Asia"];

    // 2. Load the Template
    const templatePath = path.join(process.cwd(), 'blog.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    // 3. The Loop (Generating 25 variations per run to stay safe)
    for (let niche of niches) {
        for (let loc of locations) {
            let pageContent = template
                .replace(/{{niche}}/g, niche)
                .replace(/{{location}}/g, loc)
                .replace(/{{date}}/g, new Date().toDateString());

            // Ensure the vulture-link class is present for affiliate.js to hook into
            pageContent = pageContent.replace('class="cta-button"', 'class="cta-button vulture-link"');

            const fileName = `blog-${niche.toLowerCase().replace(' ', '-')}-${loc.toLowerCase()}.html`;
            const filePath = path.join(process.cwd(), 'archives', fileName);

            // Create directory if missing
            if (!fs.existsSync('archives')) fs.mkdirSync('archives');

            fs.writeFileSync(filePath, pageContent);
            console.log(`✅ Generated: ${fileName}`);
        }
    }
}const randomInternalLinks = `
    <footer style="margin-top: 50px; padding: 20px; background: #eee;">
        <h4>Related 2026 Growth Guides:</h4>
        <ul>
            <li><a href="blog-saas-london.html">Automating SaaS in London</a></li>
            <li><a href="blog-real-estate-miami.html">Real Estate Efficiency: Miami Edition</a></li>
            <li><a href="blog-crypto-tokyo.html">Web3 Workflows in Tokyo</a></li>
        </ul>
    </footer>
`;

generateVulturePages().catch(console.error);
