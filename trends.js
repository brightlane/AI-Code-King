const fetch = require("node-fetch");

async function getTrends() {
  const url =
    "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US";

  const res = await fetch(url);
  const text = await res.text();

  const matches = [...text.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)];

  const trends = matches.slice(2, 12).map(m => m[1]);

  return trends;
}

module.exports = { getTrends };
