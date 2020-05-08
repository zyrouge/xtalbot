const Discord = require("discord.js");

exports.run = async (xtal, message, args) => {
  
    try {
        let text = args.join(" ");
        if (!text)  text = "Provide some Text.";
        message.channel.send(new Discord.Attachment('https://www.minecraftskinstealer.com/achievement/a.php?i=20&h=Achievment+Get!&t=' + encodeURIComponent(text), 'mc.png'));
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
      }
    
};
  
exports.help = {
    name: "mcachievement",
    aliases: ['mca']
};
  
exports.conf = {
    usage: "mcachievement [text]",
    description: "Minecraft Achievement.",
    category: "Text"
};