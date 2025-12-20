const axios = require("axios");
const config = require("../config");

// Heroku App URL
const HEROKU_APP_URL = 'https://dml-minbot-a2812217920a.herokuapp.com/';

module.exports = {
  command: "pair",
  desc: "Get pairing code for Dml-min bot",
  use: ".pair 2557******",
  filename: __filename,

  execute: async (socket, msg, args) => {
    const messages = {
      invalid: "❌ Please provide a valid phone number with country code\nExample: .pair +255*******",
      failed: "❌ Failed to retrieve pairing code. Please try again later.",
      done: "> *MINI BILAL PAIRING COMPLETED ✅*",
      error: "❌ An error occurred while getting pairing code. Please try again later.",
    };

    try {
      // Get sender details
      const senderId = msg.sender || msg.key?.participant || msg.key?.remoteJid || "";
      const senderNumber = senderId.split("@")[0];

      // Use args or fallback
      const phoneNumber = args.length > 0 ? args.join(" ").trim() : "";

      const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];
      
      if (!phoneNumber) {
        return socket.sendMessage(
          msg.key?.remoteJid || senderId,
          {
        image: { url: 'https://bandaheali-cdn.koyeb.app/media/bot_1766221468628.jpg' },
          caption:` ca pair your account, please use:
*➡️ .pair <your_number>*`,
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

      if (!phoneNumber.match(/^\+?\d{10,15}$/)) {
        return await socket.sendMessage(
          msg.key?.remoteJid || senderId,
          { text: messages.invalid },
          { quoted: msg }
        );
      }

      const baseUrl = `${HEROKU_APP_URL}/code?number=`;
      const response = await axios.get(`${baseUrl}${encodeURIComponent(phoneNumber)}`);

      if (!response.data || !response.data.code) {
        return await socket.sendMessage(
          msg.key?.remoteJid || senderId,
          { text: messages.failed },
          { quoted: msg }
        );
      }

      const pairingCode = response.data.code;

      const otpCaption = `╭─⃝──────⊷
*┊ ┊ ┊ ┊ ┊ ┊┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀ ✧* 
*┊ ☪︎⋆*
*⊹*    🪔 *Getting Pair code*
┊ ──¬¬¬¬¦
┊▢ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴇʟɪᴛᴇ
┊▢📞 *Number:* _${phoneNumber}_ 
┊▢your paircode is - ${pairingCode} 
┊ ──¬¬¬¬¬¦
┊ *Complete pairing quickly*
╰┬──────────⊷⳹`;

        const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];

await socket.sendMessage(
        msg.key?.remoteJid || senderId,
        { 
image: { url: 'https://bandaheali-cdn.koyeb.app/media/bot_1766221468628.jpg' },
          caption: otpCaption, buttons: buttons },{ quoted: msg }); 

     

      await new Promise((r) => setTimeout(r, 2000));
      await socket.sendMessage(
        msg.key?.remoteJid || senderId,
        { text: pairingCode },
        { quoted: msg }
      );
    } catch (error) {
      console.error("Pair command error:", error);
      const senderId = msg.sender || msg.key?.participant || msg.key?.remoteJid || "";
      await socket.sendMessage(
        msg.key?.remoteJid || senderId,
        { text: messages.error },
        { quoted: msg }
      );
    }
  },
};
