const axios = require('axios');

module.exports = {
    command: 'weather',
    description: 'Get real-time weather information',
    execute: async (socket, msg, args, number) => {
        const sender = msg.key.remoteJid;
        const jidName = sender.split('@')[0];
        const location = args.join(' ') || 'Colombo';

        const weatherImgUrl = `https://wttr.in/${encodeURIComponent(location)}.png?m`;  

        // 🌦️ Emoji animation   
        const emojiStages = [  
            '☁️',  
            '🌤️',  
            '🌥️',  
            '🌧️',  
            '🌦️',  
            '⛈️',  
            '⚡',  
            '*✅ Weather Data Ready!*'  
        ];  

        // Send message  
        let { key } = await socket.sendMessage(sender, { text: '☁️ Preparing weather info...' });  

        for (const emoji of emojiStages) {  
            await socket.sendMessage(sender, { text: `> ${emoji} Getting data for *${location}*...`, edit: key });  
            await new Promise(res => setTimeout(res, 500)); // 0.5s delay  
        }         
            

        const caption =`╭─⃝──────⊷
*┊ ┊ ┊ ┊ ┊ ┊┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀ ✧* 
*┊ ☪︎⋆*
*⊹*    🪔 *weather*
*✧* 「*location* 」

*┊* ✧ _*weather test time*_
┊ ──¬¬¬¬¦
┊  🌍 ʟᴏᴄᴀᴛɪᴏɴ: ${location}
┊  👤 ᴜꜱᴇʀ: @${jidName}
┊  📅 ᴛɪᴍᴇ: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}
┊ ──¬¬¬¬¬¦
┊ ꜱᴇᴇ ᴛʜᴇ ɪᴍᴀɢᴇ ꜰᴏʀ ᴀʟʟ ᴅᴇᴛᴀɪʟꜱ
┊ ᴛʏᴘᴇ .ᴡᴇᴀᴛʜᴇʀ [ʟᴏᴄᴀᴛɪᴏɴ] ꜰᴏʀ ᴏᴛʜᴇʀ ᴄɪᴛɪᴇꜱ
╰┬──────────⊷⳹`;

        const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '☁️Self family Weather' },   type: 1 },
];


            await socket.sendMessage(sender, {  
            image: { url: weatherImgUrl },
            caption,  
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
  
