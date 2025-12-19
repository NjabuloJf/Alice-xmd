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

      const menuMsg = 

         `╭─⃝──────⊷
*┊ ┊ ┊ ┊ ┊ ┊┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀ ✧* 
*┊ ☪︎⋆*
*⊹*    🪔 *𝐌𝐄𝐍𝐔*
*✧* 「hᥲᥣᥣo *: ${pushname}* 」

*┊* ✧ _*commandes*_
┊ ──¬¬¬¬¦
┊▢ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴇʟɪᴛᴇ
┊▢ᴘʀᴇғɪx *: ${config.PREFIX}*
┊▢ᴍᴏᴅᴇ: ᴘᴜʙʟɪᴄ 
┊▢ɴᴏᴅᴇ ᴠᴇʀsɪᴏɴ : ᴠ2.1.3
┊ ──¬¬¬¬¬¦
┊ *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ғʀᴇᴇ ғᴀᴍɪʟʏ*
╰┬──────────⊷⳹
┌┤ 🌴ᴀᴍ ᴇɴᴊᴏʏɪɴɢ ᴡɪᴛʜ ᴍʏ *sᴇʟғs* 
┊╰────────────⋆｡
╰──────────────⊷`;

      
const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];
 

      await sock.sendMessage(
        from,
        {
          image: { url: 'https://files.catbox.moe/xazdqk.jpg' },
          caption: menuMsg,
          buttons: buttons
              }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

      

      
    const audioUrl = "https://files.catbox.moe/f97bi3.mp3";
          
        await sock.sendMessage(
        from,
        {
          audio: { url: audioUrl },
            mimetype: 'audio/mp3',
            ptt: true,
            contextInfo: {
              externalAdReply: {
               title: "🍥sᴇʟғs ғᴀᴍɪʟʏ",
               mediaType: 1,
               previewType: 0,
               thumbnailUrl: "https://files.catbox.moe/u6v5ir.jpg",
               sourceUrl: "https://www.instagram.com/njabulojb871",
              renderLargerThumbnail: false,        
            }
          }
            }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });



    } catch (e) {
      console.error("❌ Menu Error:", e);
      await sock.sendMessage(
        msg.key.remoteJid,
        { text: `❌ ERROR: ${e.message}` },
        { quoted: msg }
      );
    }
  }
};
 
