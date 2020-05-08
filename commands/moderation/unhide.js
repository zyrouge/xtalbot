const Discord = require('discord.js');

exports.run = async (xtal, message, args, colors) => {

    let channel = message.mentions.channels.first() || message.channel;
    channel.overwritePermissions(channel.guild.defaultRole, { VIEW_CHANNEL: true });

    let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor(colors.green)
    .addField("Channel Unhided", `**Channel:** ${channel} | ${channel.name} | ${channel.id}`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "unhide",
  aliases: []
};

exports.conf = {
  usage: "unhide <#channel>",
  description: "Unhides the Channel.",
  category: "Moderation"
};