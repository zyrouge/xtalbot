const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

  //store verification level
  switch (message.guild.verificationLevel) {
    case 0: var vLevel = "None"; break;
    case 1: var vLevel = "Low"; break;
    case 2: var vLevel = "Medium"; break;
    case 3: var vLevel = "(╯°□°）╯︵ ┻━┻"; break;
    case 4: var vLevel = "┻━┻︵ \ (°□°）/ ︵ ┻━┻"; break;
  };
//store content filter
switch (message.guild.explicitContentFilter) {
    case 0: var cFilter = "Don't scan any messages"; break;
    case 1: var cFilter = "Scan messages from members without a role"; break;
    case 2: var cFilter = "scan messages sent by all members"; break;
  }
  
  let features = message.guild.features.map(m => m).join(", ") || 'No Features';

var embed = new Discord.RichEmbed()
    .setAuthor(`Server Info: ${message.guild.name}`, message.guild.iconURL)
    .setColor(colors.white)
    .addField(`Basic`, `
**Owner:** ${message.guild.members.get(message.guild.ownerID).user.tag}
**Available:** ${(message.guild.available  ? "Available" : "Not Available")}
**Region:** ${message.guild.region.charAt(0).toUpperCase() + message.guild.region.substring(1)} 
**Creation Date:** ${message.guild.createdAt}
**Verification Level:** ${vLevel}
**Features:** ${features}`)
    .addField(`Counters`, `
**Emojis:** ${message.guild.emojis.size}
**Roles:** ${message.guild.roles.size}
**Members:** ${message.guild.memberCount} [${emojis.online}**${message.guild.members.filter(m => m.user.presence.status == "online").size}** |${emojis.idle}**${message.guild.members.filter(m => m.user.presence.status == "idle").size}** |${emojis.dnd}**${message.guild.members.filter(m => m.user.presence.status == "dnd").size}** |${emojis.offline}**${message.guild.members.filter(m => m.user.presence.status == "offline").size}** ]
**Channels:** ${message.guild.channels.size} [${emojis.text}${message.guild.channels.findAll('type', 'text').length} |${emojis.voice}${message.guild.channels.findAll('type', 'voice').length} ]
**AFK info:** Move to ${message.guild.afkChannel !== null ? message.guild.afkChannel : "None"} after ${message.guild.afkTimeout / 60} minutes
**Content Filter:** ${cFilter}
   `)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setTimestamp();
message.channel.send(embed).catch(console.error);

};

exports.help = {
  name:"serverinfo",
  aliases: ['si']
};

exports.conf = {
  usage: "serverinfo",
  aliases: "si",
  description: "Shows the Server Info.",
  category: "Info"
};