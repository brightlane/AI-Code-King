const fs = require("fs");
const { getTrends } = require("./trends");
const { getTechNews } = require("./rss");

const affiliate =
  "https://www.linkconnector.com/ta.php?lc=007949000012007981&url=https%3A%2F%2Fwww.youware.com%2F&atid=YouWareWeb";

function clean(text) {
  return text.replace(/[^a-zA-Z0-9 ]/g, "");
}

async function buildBlog() {
  const trends = await getTrends();
  const news = await getTechNews();

  const topicRaw = trends[0] || news[0] || "workflow automation";
  const topic = clean(topicRaw);

  const date = new Date().toISOString().split("T")[0];

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>${topic} | YouWare Workflow Insights</title>

<meta name="description" content="Daily SEO breakdown of ${topic} and how it impacts workflow automation and productivity systems." />
<meta name="keywords" content="${topic}, workflow automation, SaaS tools, productivity systems" />
<meta name="robots" content="index, follow" />

<link rel="canonical" href="https://brightlane.github.io/AI-Code-King/blog-${date}.html" />

<style>
body{font-family:Arial;line-height:1.6;margin:0}
header{background:#1e90ff;color:white;padding:40px;text-align:center}
main{max-width:900px;margin:auto;padding:20px}
a{color:#ff4500;font-weight:bold}
</style>

</head>

<body>

<header>
<h1>${topic}</h1>
<p>Real-time SEO trend analysis</p>
</header>

<main>

<h2>Overview</h2>
<p>
This article explores <b>${topic}</b> and how it connects to modern workflow automation systems and SaaS productivity tools.
</p>

<h2>Why this matters</h2>
<ul>
<li>Directly trending in real search data</li>
<li>Relevant to business automation systems</li>
<li>High SEO ranking potential</li>
</ul>

<h2>Related Insights</h2>
<ul>
<li>${news[0] || "SaaS automation update"}</li>
<li>${news[1] || "workflow optimization trend"}</li>
<li>${news[2] || "business productivity tools"}</li>
</ul>

<h2>Internal Links</h2>
<ul>
<li><a href="blog.html">Main Blog</a></li>
<li><a href="blog-part8.html">Performance Guide</a></li>
<li><a href="blog-part6.html">API Systems</a></li>
<li><a href="index.html">Home</a></li>
</ul>

<h2>Recommended Tool</h2>
<p>
<a href="${affiliate}">Try YouWare Automation Platform</a>
</p>

</main>

</body>
</html>`;

  fs.writeFileSync(`blogs/blog-${date}.html`, html);

  console.log("Generated:", topic);
}

buildBlog();
