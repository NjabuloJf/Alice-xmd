module.exports = {
  command: 'uptime',
  description: 'Check bot uptime',
  category: 'main',
  react: '⏱️',


    execute: async (socket, msg, args) => {
    const sender = msg.key.remoteJid;
      
    // 🕒 Calculate uptime
    const uptime = process.uptime(); // in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    

    
    const uptimeMsg =`╭─⃝──────⊷
*┊ ┊ ┊ ┊ ┊ ┊┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀ ✧* 
*┊ ☪︎⋆*
*⊹*    🪔 *ᴜᴘᴛɪᴍᴇ sʏsᴛᴇᴍ*

┊ ──¬¬¬¬¦
┊▢ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴇʟɪᴛᴇ
┊▢ʜᴏᴜʀs: ${hours}h
┊▢ᴍɪɴᴜᴛᴇs: ${minutes}m
┊▢sᴇᴄᴏɴᴅs: ${seconds}s
┊ ──¬¬¬¬¬¦
┊ *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ғʀᴇᴇ ғᴀᴍɪʟʏ*
╰┬──────────⊷⳹`;
    
    const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🏓ғᴀᴍɪʟʏ ᴄᴍᴅ ᴜᴘᴛɪᴍᴇ' },   type: 1 },
];


    
      await socket.sendMessage(sender, { 
        image: { url: 'https://bandaheali-cdn.koyeb.app/media/bot_1766221468628.jpg' },
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
