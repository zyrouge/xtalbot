const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors) => {

  let warnedmember = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

  let warns = await db.fetch(`guildWarns_${warnedmember.id}_${message.guild.id}`)
  if(warns == null) warns = 0;

  let embed = new Discord.RichEmbed()
    .setAuthor("Warnings", warnedmember.user.avatarURL)
    .setColor(colors.red)
    .addField(`Current Warnings`, `**${warns}** Warnings.`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "warns",
  aliases: ['warnings', 'warning']
};

exports.conf = {
  usage: "warns @user",
  aliases: "warnings, warning",
  description: "Shows the User Warn Count.",
  category: "Moderation"
};