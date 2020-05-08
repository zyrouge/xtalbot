const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
        let output = '';
        Object.keys(require('../package').dependencies).forEach((pack) => output += pack + '\n');
        
        let embed = new RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor(colors.white)
        .setDescription(output)
        .setTimestamp()
        .setFooter(xtal.user.username, xtal.user.avatarURL);
        
        message.channel.send(embed);
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "dependecieslist",
  aliases: ['depslist']
};

exports.conf = {
  usage: "dependecieslist",
  aliases: "depslist",
  description: "Shows the Bot Dependecies List.",
  category: "Misc"
};