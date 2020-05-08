const db = require('quick.db');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
    if(args[0] && args[0].toLowerCase() == "disable") {
        await db.set(`guildLogs_${message.guild.id}`, 'None.');
        message.channel.send(`Logs Channel has set to be **None.**`);
        return;
    } else {
    let channel;
    if(message.mentions.channels.first()) { channel = message.mentions.channels.first() }
    else if(args[0]) { channel = message.guild.channels.find('id', args[0]) || message.guild.channels.find('name', args[0]);  }
    let fetchchannel = await db.fetch(`guildLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') {fetchchannel = "**None.**"}
    else {fetchchannel = `<#${fetchchannel}>`;}
    if(!channel) return message.channel.send(`Logs Channel on this guild is ${fetchchannel}`);
    await db.set(`guildLogs_${message.guild.id}`, channel.id);
    message.channel.send(`Logs Channel Changed to <#` + channel.id + `>`);
    }
};

exports.help = {
  name: "logging",
  aliases: ['logchannel', 'logs']
};

exports.conf = {
  usage: "logging **or** logging #channel **or** logging disable",
  aliases: "logchannel, logs, modlog",
  description: "Shows/Sets the Logs Channel.",
  category: "Configuration"
};