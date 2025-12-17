// DML‑MIN BOT – FULL MENU SCRIPT
const config = require('../config');

function runtime(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

/* Random media */
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

const audioUrls = [
  "https://files.catbox.moe/6x0rb7.mp3",
  "https://files.catbox.moe/uz4apw.mp3",
  "https://files.catbox.moe/cup6rc.mp3"
];
const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

const greeting = "Hello!";

/* Interactive buttons */
const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u"
    })
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Messaging online",
      id: "copy",
      copy_code: greeting
    })
  }
];

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
╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃     DML-MIN BOT MENU   
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

👤 User      : ${pushname}
💬 Prefix    : ${config.PREFIX}
⚙️ Mode      : PUBLIC
🧩 Version   : 4.0.0
⏱ Uptime    : ${runtime(process.uptime())}

════════════════════════════

🌐 DOWNLOAD & MEDIA
┌────────────────────────┐
│ ⬇️ dl                    
│ 📦 Apk                   
│ 📘 Facebook              
│ 🎵 Song                  
│ 🎬 Video                 
│ 🎥 TikTok                
│ 🎥 Vv                    
│ 🐱 Cat                   
│ 🖼 Getpp                 
│ 🖼 Dp                    
│ 🌦 Weather               
└────────────────────────┘

🤖 AI & GENERAL
┌────────────────────────┐
│ 🧠 Aisummary             
│ 😹 Joke                  
│ 🌐 Wabeta               
│ 💫 Alive                 
│ ⏱ Uptime                
│ ⚡ pi                  
│ 🧭 Menu                  
└────────────────────────┘

👥 GROUP MANAGEMENT
┌────────────────────────┐
│ 🆙 Promote               
│ 👇 Demote                
│ 🚫 Kickall               
│ 🏷 Tagall                
│ 🕶 Hidetag               
│ 🔇 Mute                  
│ 🔊 Unmute                
│ ❌ Delete                
│ 🪩 Join                  
└────────────────────────┘

🔐 OWNER & CONTROL
┌────────────────────────┐
│ 👑 Owner                 
│ ⛔ Block                 
│ 🔓 Unblock               
│ 🔑 Pair                  
└────────────────────────┘

✨ DML-MIN-BOT ✨
`;

      // Menu with random image and buttons
      await sock.sendMessage(from, {
        interactiveMessage: {
          header: {
            image: { url: randomNjabulourl }
          },
          body: { text: menuMsg },
          buttons,
          headerType: 1
        }
      }, { quoted: msg });

      // Random voice note
      await sock.sendMessage(from, {
        audio: { url: randomAudioUrl },
        mimetype: 'audio/mp4',
        ptt: true
      }, {
        quoted: {
          key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
          },
          message: {
            contactMessage: {
              displayName: "🟢online njᥲbᥙᥣo🍥",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
            }
          }
        }
      });

    } catch (e) {
      console.error("❌ Menu Error:", e);
      await sock.sendMessage(from, { text: `❌ ERROR: ${e.message}` }, { quoted: msg });
    }
  }
};
