/**
 * VULTURE YIELD OPTIMIZER (2026 Edition)
 * Purpose: Route traffic based on high-ticket regional payouts.
 */

async function optimizeYield() {
    // 1. Get User Location (Free API)
    try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        const country = geoData.country_code; // e.g., 'US', 'GB', 'DE'

        // 2. Define High-Ticket Targets
        const SKYSCANNER_URL = "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";
        const YOUWARE_BASE = "https://www.linkconnector.com/ta.php?lc=007949000012007981&url=https%3A%2F%2Fwww.youware.com%2F&atid=Vulture_Geo_";

        const links = document.querySelectorAll('.vulture-link');

        links.forEach(link => {
            if (country === 'GB' || country === 'EU') {
                // UK/Europe traffic is high-intent for Skyscanner Travel
                link.href = SKYSCANNER_URL;
                if (link.innerText.includes("Productivity")) {
                    link.innerText = "Plan Your Next Remote Work Trip (Skyscanner)";
                }
            } else {
                // Default to YouWare with Geo-Tagging for the US/Global
                link.href = YOUWARE_BASE + country;
            }
        });
        
        console.log(`Vulture optimized for: ${country}`);
    } catch (err) {
        console.log("Geo-Optimization failed, defaulting to base links.");
    }
}

document.addEventListener('DOMContentLoaded', optimizeYield);
