const config = require('../config');

function runtime(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

module.exports = {
  command: "commandes",
  description: "Show full stylish bot menu.",
  react: "👑",
  category: "main",

  execute: async (sock, msg) => {
    try {
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || from;
      const pushname = msg.pushName || "there";

      

      const menuMsgg = `
ᴅᴏᴡɴʟᴏᴀᴅ & ᴍᴇᴅɪᴀ 
① ᴅʟ 
② ᴀᴘᴋ 
③ ғᴀᴄᴇʙᴏᴏᴋ 
④ sᴏɴɢ 
⑤ ᴠɪᴅᴇᴏ 
⑥ ᴛɪᴋᴛᴏᴋ 
⑥ ᴠᴠ 
⑧ ᴄᴀᴛ 
⑨ ɢᴇᴛᴘᴘ 
⑩ ᴅᴘ 
⑪ ᴡᴇᴀᴛʜᴇʀ 

ᴀɪ & ɢᴇɴᴇʀᴀʟ 
① ᴀɪsᴜᴍᴍᴀʀʏ 
② ᴊᴏᴋᴇ 
③ ᴡᴀʙᴇᴛᴀ 
④ ᴀʟɪᴠᴇ 
⑤ ᴜᴘᴛɪᴍᴇ 
⑥ ᴘɪ 
⑥ ᴍᴇɴᴜ 

ɢʀᴏᴜᴘ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ 
① ᴘʀᴏᴍᴏᴛᴇ 
② ᴅᴇᴍᴏᴛᴇ 
③ ᴋɪᴄᴋᴀʟʟ 
④ ᴛᴀɢᴀʟʟ 
⑤ ʜɪᴅᴇᴛᴀɢ 
⑥ ᴍᴜᴛᴇ 
⑥ ᴜɴᴍᴜᴛᴇ 
⑧ ᴅᴇʟᴇᴛᴇ 
⑨ ᴊᴏɪɴ 

ᴏᴡɴᴇʀ & ᴄᴏɴᴛʀᴏʟ 
① ᴏᴡɴᴇʀ 
② ʙʟᴏᴄᴋ 
③ ᴜɴʙʟᴏᴄᴋ 
④ ᴘᴀɪʀ
`;
      
const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];
 

      

      await sock.sendMessage(
        from,
        {
          text: menuMsgg,
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
 
 
