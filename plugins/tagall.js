module.exports = {
  command: "tagall",
  desc: "Tag everyone in the group",
  category: "group",
  use: ".tagall",
  fromMe: true,
  filename: __filename,

  execute: async (sock, msg) => {
    const metadata = await sock.groupMetadata(msg.key.remoteJid);
    const participants = metadata.participants.map(p => p.id);
    const groupName = metadata.subject || "Group";
    const adminCount = metadata.participants.filter(p => p.admin).length;
    const user = msg.pushName || "User";
    const memberCount = participants.length;

    // List of emojis for mentions
    const emojis = ["🌺", "🌹", "🌟", "🌝", "🍒", "🍥", "🍷"];
    
    // Create mentions with alternating emojis
    const mentionsText = participants.map((id, index) => {
      const emoji = emojis[index % emojis.length];
      return `${emoji} @${id.split("@")[0]}`;
    }).join("\n");

    const caption = `
🏷️ Group      : ${groupName}
👑 Admins     : ${adminCount}
👤 User       : ${user}
👥 Members    : ${memberCount}

${mentionsText}
`;
const buttons = [
  { buttonId: '.web',   buttonText: { displayText: '🍬sᴇʟғs ғᴀᴍɪʟʏ' },   type: 1 },
];

        
          await sock.sendMessage(msg.key.remoteJid, {
          image: { url: 'https://files.catbox.moe/xazdqk.jpg' },
           caption: caption,
            mentions: participants,
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
        
