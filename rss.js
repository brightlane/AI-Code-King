/**
 * VULTURE RSS SCRAPER - Node 20 Native Fetch
 */
async function getNews() {
    console.log("📡 Scraping Freshness Data...");
    try {
        // Example: Product Hunt or TechNews RSS
        const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.producthunt.com/feed'));
        const data = await res.json();
        
        // Simple regex to grab titles from XML
        const titles = [...data.contents.matchAll(/<title>(.*?)<\/title>/g)].map(t => ({ title: t[1] }));
        
        fs.writeFileSync('rss_data.json', JSON.stringify(titles.slice(0, 10)));
        console.log("✅ News data cached.");
    } catch (e) {
        fs.writeFileSync('rss_data.json', JSON.stringify([{title: "New Productivity Trends for 2026"}]));
    }
}

const fs = require('fs');
getNews();
