const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  let kill = message.mentions.members.first();
  if(!kill) {
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(message.author + ` killed themselves. 💔 Rest in Peace.`)
    .setColor(colors.red)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    message.channel.send(embed);
    return;
  } else {
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(message.author + ` killed `+ kill +`. 💔 Rest in Peace.`)
    .setColor(colors.red)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    message.channel.send(embed);
    return;
  }
  
};

exports.help = {
  name: "kill",
  aliases: []
};

exports.conf = {
  usage: "kill @user",
  aliases: "None.",
  description: "Kill a User.",
  category: "Games"
};