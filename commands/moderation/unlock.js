const Discord = require('discord.js');

exports.run = async (xtal, message, args, colors) => {

    let channel = message.mentions.channels.first() || message.channel;
    channel.overwritePermissions(channel.guild.defaultRole, { SEND_MESSAGES: true });

    let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor(colors.green)
    .addField("Channel Unlocked", `**Channel:** ${channel} | ${channel.name} | ${channel.id}`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "unlock",
  aliases: []
};

exports.conf = {
  usage: "unlock <#channel>",
  description: "Unlocks the Channel.",
  category: "Moderation"
};