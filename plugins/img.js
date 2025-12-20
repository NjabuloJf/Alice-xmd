
const gis = require("g-i-s");
const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");

module.exports = {
  command: "img",
  description: "👾 Google Image Search",
  react: "📸",
  category: "media",
  execute: async (socket, msg, args) => {
    try {
      const from = msg.key.remoteJid;
      const query = args.join(" ");
      const pushname = msg.pushName || "there";

      if (!query) {
        return await socket.sendMessage(from, { text: `🔍 *Google Image Search*\n\nPlease enter a query!\n\nExample:\n.img cat` }, { quoted: msg });
      }

      gis(query, async (error, results) => {
        if (error || !results || results.length === 0) {
          return await socket.sendMessage(from, { text: "❌ Not enough images found. Try another keyword." }, { quoted: msg });
        }

        const img1 = results[0].url;
        const img2 = results[1].url;
        const moreImages = results.slice(2, 12).map(r => r.url);

        const caption = `🔎 *Search Results for "${query}"*\n\n👤 Requested By: ${pushname}\n\nReply with:\n1 - Image\n2 - Document\n3 - 10 More Images`;

        const sentMsg = await socket.sendMessage(from, { image: { url: img1 }, caption }, { quoted: msg });

        const msgId = sentMsg.key.id;
        const messageListener = async (messageUpdate) => {
          try {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const isReply = mek.message.extendedTextMessage?.contextInfo?.stanzaId === msgId;
            if (!isReply) return;
            if (mek.key.remoteJid !== from) return;

            const text = mek.message.conversation || mek.message.extendedTextMessage?.text;
            await socket.sendMessage(from, { react: { text: '✅', key: mek.key } });

            switch (text.trim()) {
              case "1":
                await socket.sendMessage(from, { image: { url: img1 }, caption: `✅ *Here is your image!*` }, { quoted: mek });
                break;
              case "2":
                await socket.sendMessage(from, { document: { url: img2 }, mimetype: "image/jpeg", fileName: `img_${Date.now()}.jpg`, caption: `📄 *Here is your image as document!*` }, { quoted: mek });
                break;
              case "3":
                for (let i = 0; i < moreImages.length; i++) {
                  await socket.sendMessage(from, { image: { url: moreImages[i] }, caption: `🖼️ *Extra Image ${i + 1}*` }, { quoted: mek });
                  await new Promise(res => setTimeout(res, 1000));
                }
                break;
              default:
                await socket.sendMessage(from, { text: "❌ Invalid option. Reply with 1, 2, or 3 only." }, { quoted: mek });
            }
          } catch (err) {
            console.error("Reply handler error:", err);
          }
        };

        socket.ev.on("messages.upsert", messageListener);
        setTimeout(() => socket.ev.off("messages.upsert", messageListener), 2 * 60 * 1000);
      });
    } catch (e) {
      console.error("Main error:", e);
      await socket.sendMessage(msg.key.remoteJid, { text: `⚠️ *Error occurred:* ${e.message}` }, { quoted: msg });
    }
  }
};
