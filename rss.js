const fs = require('fs');

async function getNews() {
    console.log("📡 Scraping Freshness Data...");
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.producthunt.com/feed');
        const res = await fetch(proxyUrl);
        const data = await res.json();
        
        // Extract titles from RSS XML
        const titles = [...data.contents.matchAll(/<title>(.*?)<\/title>/g)]
            .map(t => ({ title: t[1].replace('<![CDATA[', '').replace(']]>', '') }))
            .filter(t => t.title !== "Product Hunt");

        fs.writeFileSync('rss_data.json', JSON.stringify(titles.slice(0, 10), null, 2));
        console.log("✅ News data cached.");
    } catch (e) {
        console.error("Scraper Failed, using fallback.");
        fs.writeFileSync('rss_data.json', JSON.stringify([{title: "AI & Productivity Trends for 2026"}]));
    }
}

getNews();
