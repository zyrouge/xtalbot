const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors) => {

  let warnedmember = message.mentions.members.first() || message.guild.members.get(args[0]);

  await db.set(`guildWarns_${warnedmember.id}_${message.guild.id}`, 0)

  let embed = new Discord.RichEmbed()
    .setAuthor("Warnings Cleared", warnedmember.user.avatarURL)
    .setColor(colors.red)
    .addField(`Current Warnings`, `**0** Warnings.`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "clearwarns",
  aliases: ['clearwarnings', 'clearwarning']
};

exports.conf = {
  usage: "clearwarns @user",
  aliases: "clearwarnings, clearwarning",
  description: "Clears the User Warnings.",
  category: "Moderation"
};