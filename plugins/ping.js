module.exports = {
    command: "pi",
    desc: "Check bot response time",
    category: "utility",
    use: ".ping",
    fromMe: false,
    filename: __filename,

    execute: async (sock, msg) => {
        // Define common variables from the message object
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid; // Adjust based on your library
        const start = Date.now();

       const replyText = "Checking latency..."; // Placeholder for text
        
        await sock.sendMessage(from, { // Using 'sock' instead of 'conn'
            text: replyText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403958418756@newsletter',
                    newsletterName: "DML-PING",
                    serverMessageId: 143
                }
            }
        }); // <-- Missing closing parenthesis fixed here

        // Calculate latency *after* all awaited operations have completed, but before the final message
        const latency = Date.now() - start;

        // 3. Final reply with latency result, quoted to the original message
        await sock.sendMessage(from,{
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
    } // <-- Missing closing brace for execute function fixed here
}; // <-- Closing brace for module.exports object
