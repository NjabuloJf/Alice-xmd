
const axios = require('axios');

module.exports = {
  command: 'lyrics',
  alias: ["lyric"],
  description: "Get song lyrics",
  category: "music",
  react: "🎶",
  usage: ".lyrics <song name>",
  execute: async (socket, msg, args, { reply, from }) => {
    const songName = args.join(' ');
    if (!songName) return reply("Please provide a song name!");

    const apis = [
      `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(songName)}`,
      `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(songName)}`,
      `https://api.davidcyriltech.my.id/lyrics?title=${encodeURIComponent(songName)}`,
    ];

    let lyricsData;
    for (const api of apis) {
      try {
        const response = await axios.get(api);
        if (response.data?.result?.lyrics) {
          lyricsData = response.data;
          break;
        }
      } catch (error) {
        console.error(`API ${api} failed:`, error.message);
      }
    }

    if (!lyricsData?.result) {
      return reply(`*Couldn't find lyrics for "${songName}"*`);
    }

    const { title, artist, thumb, lyrics } = lyricsData.result;
    const imageUrl = thumb || "https://files.catbox.moe/b2vql7.jpg";

    try {
      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      await socket.sendMessage(from, {
        image: { url: imageUrl },
        caption: `*${title}* by ${artist}\n\n${lyrics}`,
      });
    } catch (e) {
      console.error("Error sending image:", e);
      reply(`*${title}* by ${artist}\n\n${lyrics}`);
    }
  }
};

