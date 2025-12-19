module.exports = {
  command: 'uptime',
  description: 'Check bot uptime',
  category: 'main',
  react: '⏱️',

  execute: async (socket, msg, args) => {
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || msg.key.remoteJid; // Adjust based on your library
      const pushname = msg.pushName || "there"

    // 🕒 Calculate uptime
    const uptime = process.uptime(); // in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    

    
    const uptimeMsg =`╭─⃝──────⊷
*┊ ┊ ┊ ┊ ┊ ┊┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀ ✧* 
*┊ ☪︎⋆*
*⊹*    🪔 *𝐌𝐄𝐍𝐔*
*✧* 「hᥲᥣᥣo *: ${pushname}* 」

*┊* ✧ _*ping test time*_
┊ ──¬¬¬¬¦
┊▢ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴇʟɪᴛᴇ
┊▢Hours     : ${hours}h
┊▢Minutes   : ${minutes}m
┊▢Seconds   : ${seconds}s
┊▢ɴᴏᴅᴇ ᴠᴇʀsɪᴏɴ : ᴠ2.1.3
┊ ──¬¬¬¬¬¦
┊ *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ғʀᴇᴇ ғᴀᴍɪʟʏ*
╰┬──────────⊷⳹`;
    
    const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];


    await sock.sendMessage(from,{
        image: { url: 'https://files.catbox.moe/xazdqk.jpg' },
          caption: uptimeMsg,
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
  }
};
