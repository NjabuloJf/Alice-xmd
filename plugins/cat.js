const axios = require('axios');

module.exports = {
  command: 'cat',
  description: 'Send a random cute cat picture',
  execute: async (socket, msg, args, number) => {
    const sender = msg.key.remoteJid;
    try {
      const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');

        
      const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
]; 
        // 3. Final reply with latency result, quoted to the original message
        await socket.sendMessage(sender, {
        image: { url: data[0].url },
          caption: '🐱 Here\'s a cute cat!',
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
    } catch (err) {
      await socket.sendMessage(sender, { text: '❌ Could not fetch cat image.' }, { quoted: msg });
    }
  }
};
