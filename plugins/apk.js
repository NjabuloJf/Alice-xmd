const axios = require("axios");

module.exports = {
  command: 'apk',
  alias: ["app","apps","application","ap"],
  description: "Download APK from Aptoide",
  category: "download",
  react: "🥺",
  usage: ".apk <app name>",
  execute: async (socket, msg, args) => {
    const sender = msg.key.remoteJid;
    const q = args.join(" ");
    let waitMsg;

    try {
      // React to command
      await socket.sendMessage(sender, { react: { text: "🥺", key: msg.key } });

      if (!q) return await socket.sendMessage(sender, {
        text: "*IF YOU WANT TO DOWNLOAD ANY APP 🥺* \n *THEN TYPE LIKE THIS 😇* \n\n *APK ❮YOUR APP NAME❯* \n\n *YOUR APPLICATION WILL BE DOWNLOADED AND SENT HERE*"
      }, { quoted: msg });

      // Waiting message
      waitMsg = await socket.sendMessage(sender, { text: "*YOUR APK IS DOWNLOADING 🥺 WHEN THE DOWNLOAD IS COMPLETE IT WILL BE SENT HERE 😇* \n *PLEASE WAIT A LITTLE...☺️*" });

      const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || !data.datalist || !data.datalist.list.length) {
        if (waitMsg) await socket.sendMessage(sender, { delete: waitMsg.key });
        return await socket.sendMessage(sender, { text: "*APK NOT FOUND SORRY 😔*" }, { quoted: msg });
      }

      const app = data.datalist.list[0];
      const appSize = (app.size / 1048576).toFixed(2);

      
              const apkMsg =`╭─⃝──────⊷
*┊ ┊ ┊ ┊ ┊ ┊┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀ ✧* 
*┊ ☪︎⋆*
*⊹*    🪔 *Donload*
*✧* 「message *: apk* 」

*┊* ✧ _*ping test time*_
┊ ──¬¬¬¬¦
┊▢ɴᴀᴍᴇ: ${app.name} 
┊▢size: ${appSize} 
┊ ──¬¬¬¬¬¦
┊ *ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ғʀᴇᴇ ғᴀᴍɪʟʏ*
╰┬──────────⊷⳹`;

        const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];
      
        await socket.sendMessage(sender, { 
        image: { url: 'https://files.catbox.moe/xazdqk.jpg' },
          caption: apkMsg,
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
      
      // Send APK
      await socket.sendMessage(sender, { 
        document: { url: app.file.path_alt },
        fileName: `${app.name}.apk`,
        mimetype: "application/vnd.android.package-archive",
        caption: `*Google store:* ${app.name}`
      }, { quoted: msg });
      

      // Delete waiting message
      if (waitMsg) await socket.sendMessage(sender, { delete: waitMsg.key });

      // React after success
      await socket.sendMessage(sender, { react: { text: "☺️", key: msg.key } });

    } catch (error) {
      console.error("APK download error:", error);
      if (waitMsg) await socket.sendMessage(sender, { delete: waitMsg.key });
      await socket.sendMessage(sender, { text: "*😔 APK download failed, please try again!*" }, { quoted: msg });
      await socket.sendMessage(sender, { react: { text: "😔", key: msg.key } });
    }
  }
};
 
