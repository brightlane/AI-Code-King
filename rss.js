const fetch = require("node-fetch");

async function getTechNews() {
  const url = "https://www.producthunt.com/feed";

  const res = await fetch(url);
  const text = await res.text();

  const matches = [...text.matchAll(/<title>(.*?)<\/title>/g)];

  const news = matches.slice(2, 10).map(m => m[1]);

  return news;
}

module.exports = { getTechNews };
