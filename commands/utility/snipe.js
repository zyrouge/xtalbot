const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    const db = require('quick.db');
    let channel = message.mentions.channels.first() || message.channel;
    let check = await db.fetch(`guildMessageDelete_${channel.id}`);
    if(check ===  null || !check) return message.channel.send(`There's Nothing To Snipe!`);
    let embed = new RichEmbed()
    .setAuthor(`${check.user}`, check.avatar)
    .setColor(colors.cyan)
    .setDescription(`${check.content}`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed);
  
};

exports.help = {
  name: "snipe",
  aliases: []
};

exports.conf = {
  usage: "snipe #channel",
  aliases: "None.",
  description: "Snipe the Deleted Message.",
  category: "Utility"
};