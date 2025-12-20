
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

        const img1 = results[0];
        const img2 = results[1];
        const moreImages = results.slice(2, 12);

        const caption = `🔎 *${img1.title}*\n📏 ${img1.width}x${img1.height}\n👤 Requested By: ${pushname}`;

        const buttons = [
          { buttonId: '1', buttonText: { displayText: '🖼️ Image' }, type: 1 },
          { buttonId: '2', buttonText: { displayText: '📄 Document' }, type: 1 },
          { buttonId: '3', buttonText: { displayText: '📸 10 More Images' }, type: 1 },
        ];

        const buttonMessage = {
          image: { url: img1.url },
          caption,
          footer: 'Njabulo Jb elite',
          buttons,
          headerType: 4,
        };

        const sentMsg = await socket.sendMessage(from, buttonMessage, { quoted: msg });

        const msgId = sentMsg.key.id;
        const messageListener = async (messageUpdate) => {
          try {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const isReply = mek.message.extendedTextMessage?.contextInfo?.stanzaId === msgId;
            if (!isReply) return;
            if (mek.key.remoteJid !== from) return;

            const text = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const selectedButton = mek.message?.templateButtonSelectMessage?.selectedId;
            const buttonId = selectedButton || text.trim();

            await socket.sendMessage(from, { react: { text: '✅', key: mek.key } });

            switch (buttonId) {
              case "1":
                await socket.sendMessage(from, { image: { url: img1.url }, caption: `✅ *${img1.title}* (${img1.width}x${img1.height})` }, { quoted: mek });
                break;
              case "2":
                await socket.sendMessage(from, { document: { url: img2.url }, mimetype: "image/jpeg", fileName: `${img2.title}.jpg`, caption: `📄 *${img2.title}* (${img2.width}x${img2.height})` }, { quoted: mek });
                break;
              case "3":
                for (let i = 0; i < moreImages.length; i++) {
                  const img = moreImages[i];
                  await socket.sendMessage(from, { image: { url: img.url }, caption: `🖼️ *${img.title}* (${img.width}x${img.height})` }, { quoted: mek });
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

