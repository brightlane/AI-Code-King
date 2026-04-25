const fs = require("fs");

const today = new Date().toISOString().split("T")[0];

const file = `blogs/blog-${today}.html`;

if (!fs.existsSync(file)) {
  console.log("No blog found for today.");
  process.exit();
}

const html = fs.readFileSync(file, "utf-8");

// extract title
const titleMatch = html.match(/<h1>(.*?)<\/h1>/i);
const title = titleMatch ? titleMatch[1] : "Workflow Automation";

// base affiliate
const link =
  "https://www.linkconnector.com/ta.php?lc=007949000012007981&url=https%3A%2F%2Fwww.youware.com%2F&atid=YouWareWeb";

// X (Twitter-style)
const xPost = `
🚀 New Insight: ${title}

Businesses are using automation to scale faster than ever.

Read more → ${link}

#automation #productivity #SaaS
`;

// LinkedIn post (longer, professional)
const linkedinPost = `
📊 Daily Workflow Insight: ${title}

Automation is no longer optional — it's becoming the backbone of modern businesses.

Today’s breakdown shows how systems like YouWare help teams:

• Reduce manual workload
• Scale operations efficiently
• Improve consistency across teams

Explore more here:
${link}

#BusinessAutomation #Workflow #Productivity
`;

// Facebook post (simple + engagement)
const facebookPost = `
🔥 New Post: ${title}

Discover how automation is changing the way businesses operate.

Read here: ${link}
`;

fs.writeFileSync(`social-x-${today}.txt`, xPost);
fs.writeFileSync(`social-linkedin-${today}.txt`, linkedinPost);
fs.writeFileSync(`social-facebook-${today}.txt`, facebookPost);

console.log("Social posts generated for", today);
