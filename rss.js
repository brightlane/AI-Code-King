/**
 * VULTURE RSS SCRAPER - STABLE VERSION
 * Uses Node.js 20 Native Fetch (No imports needed)
 */
const fs = require('fs');

async function getNews() {
    console.log("📡 Scraping Freshness Data via Native Fetch...");
    try {
        // Product Hunt RSS Feed
        const targetUrl = 'https://www.producthunt.com/feed';
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl);
        
        const res = await fetch(proxyUrl); // Native fetch call
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        
        const data = await res.json();
        
        // Regex to grab titles from the XML feed content
        const titles = [...data.contents.matchAll(/<title>(.*?)<\/title>/g)]
            .map(t => ({ title: t[1].replace('<![CDATA[', '').replace(']]>', '') }))
            .filter(t => t.title !== "Product Hunt"); // Filter out the feed title itself
        
        // Save the top 10 headlines for the generator to use
        fs.writeFileSync('rss_data.json', JSON.stringify(titles.slice(0, 10), null, 2));
        console.log(`✅ Successfully cached ${titles.length} headlines.`);
        
    } catch (e) {
        console.error("⚠️ Scraper Error:", e.message);
        // Fallback data so the generator doesn't crash
        const fallback = [{ title: "New Workflow Automation Trends for 2026" }];
        fs.writeFileSync('rss_data.json', JSON.stringify(fallback));
    }
}

getNews();
