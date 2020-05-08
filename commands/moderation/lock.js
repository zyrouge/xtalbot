const Discord = require('discord.js');

exports.run = async (xtal, message, args, colors) => {

    let channel = message.mentions.channels.first() || message.channel;
    channel.overwritePermissions(channel.guild.defaultRole, { SEND_MESSAGES: false });

    let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor(colors.green)
    .addField("Channel Locked", `**Channel:** ${channel} | ${channel.name} | ${channel.id}`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "lock",
  aliases: []
};

exports.conf = {
  usage: "lock <#channel>",
  description: "Locks the Channel.",
  category: "Moderation"
};