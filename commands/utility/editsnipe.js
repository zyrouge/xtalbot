const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    const db = require('quick.db');
    let channel = message.mentions.channels.first() || message.channel;
    let check = await db.fetch(`guildMessageEdit_${channel.id}`);
    if(check ===  null || !check) return message.channel.send(`There's Nothing To Snipe!`);
    let embed = new RichEmbed()
    .setAuthor(`${check.user}`, check.avatar)
    .setColor(colors.cyan)
    .addField(`Before`, check.oldContent)
    .addField(`After`, check.newContent)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed);
  
};

exports.help = {
  name: "editsnipe",
  aliases: ['esnipe']
};

exports.conf = {
  usage: "editsnipe <#channel>",
  description: "Snipe the Edited Message.",
  category: "Utility"
};