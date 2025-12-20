const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  command: 'yts',
  alias: ["ytsearch"],
  description: "Search for videos on YouTube",
  category: "utility",
  react: "🔍",
  usage: ".yts <query>",
  execute: async (socket, msg, args, { reply, from }) => {
    const query = args.join(' ');
    if (!query) return reply("Please provide a search query!");

    const url = `https://m.youtube.com/results?q=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const results = [];

      $('a[href*="/watch"]').each((index, element) => {
        if (index >= 5) return false; // Limit to 5 results
        const title = $(element).attr('title');
        const href = $(element).attr('href');
        if (title && href) {
          results.push(`*${title}*\nhttps://m.youtube.com${href}`);
        }
      });

      if (!results.length) return reply("No results found!");

      let resultText = `🔍 *YouTube Search Results for "${query}":*\n\n`;
      resultText += results.join('\n\n');
      reply(resultText);
    } catch (e) {
      console.error("YouTube search error:", e);
      reply("*⚠️ Error searching YouTube!*");
    }
  }
};

