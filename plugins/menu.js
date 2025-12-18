const config = require('../config');

function runtime(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

module.exports = {
  command: "menu",
  description: "Show full stylish bot menu.",
  react: "👑",
  category: "main",

  execute: async (sock, msg) => {
    try {
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || from;
      const pushname = msg.pushName || "there";

      const menuMsg = `
╭─⃝──────────⊷
*┊ ┊ ┊ ┊ ┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀* 
*┊ ☪︎⋆*
*⊹*    🪔 *𝐌𝐄𝐍𝐔*
*✧* 「hᥲᥣᥣo *: ${pushname}* 」

*┊* ✧ _*commandes*_
┊ ──¬¬¬¬¦
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ!*
┊▢ρrᥱfιx :  *: ${config.PREFIX}*
┊▢modᥱ : *public*
┊▢dᥲtᥱ : *8*
┊ ──¬¬¬¬¬¦
┊ *®ʀᴇᴘʟʏ* ᴡɪᴛʜ ɴᴜᴍʙᴇʀ *① ᴛᴏ ⑩*
┊ *©ʀᴇᴘʟʏ* ᴡɪᴛʜ ɴᴀᴍᴇ ʟɪᴋᴇ *ᴀɪ-ᴍᴇɴᴜ? *
╰┬──────────⊷⳹
┌┤ 🌴what's on your mind about it 
┊╰────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────⊷`;


        await sock.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/u6v5ir.jpg' },
        caption: menuMsg,
        contextInfo: { mentionedJid: [sender] }
      }, { quoted: msg })


      const audioUrl = "https://files.catbox.moe/4ufunx.mp3";
          
        await sock.sendMessage(
        from,
        {
          audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
              externalAdReply: {
               title: "📝messages menu song",
               mediaType: 1,
               previewType: 0,
               thumbnailUrl: "https://files.catbox.moe/u6v5ir.jpg",
               sourceUrl: "https://www.instagram.com/njabulojb871",
              renderLargerThumbnail: false,        
            }
          }
        },{ quoted: msg }
      );


    } catch (e) {
      console.error('❌ Menu Error:', e)
      await sock.sendMessage(from, { text: `❌ ERROR: ${e.message}` }, { quoted: msg })
    }
  }
  }
