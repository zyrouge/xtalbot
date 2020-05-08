const Discord = require('discord.js');

exports.run = async (xtal, message, args, colors) => {

    let channel = message.mentions.channels.first() || message.channel;
    channel.overwritePermissions(channel.guild.defaultRole, { VIEW_CHANNEL: false });

    let embed = new Discord.RichEmbed()
    .setThumbnail(message.guild.iconURL)
    .setColor(colors.green)
    .addField("Channel Hided", `**Channel:** ${channel} | ${channel.name} | ${channel.id}`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "hide",
  aliases: []
};

exports.conf = {
  usage: "hide <#channel>",
  description: "Hides the Channel.",
  category: "Moderation"
};