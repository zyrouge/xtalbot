const db = require('quick.db');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
    if(args[0] && args[0].toLowerCase() == "disable") {

        await db.set(`guildLeave_${message.guild.id}`, 'None.');
        message.channel.send(`Leaver Channel has set to be **None.**`);
        return;

    } else {

    let channel;
    if(message.mentions.channels.first()) { channel = message.mentions.channels.first() }
    else if(args[0]) { channel = message.guild.channels.find('id', args[0]) || message.guild.channels.find('name', args[0]) }
    let dbchannel = await db.fetch(`guildLeave_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') { dbchannel = "**None.**" }
    else { dbchannel = `<#${dbchannel}>` };
    if(!channel) return message.channel.send(`Leaver Channel on this guild is ${dbchannel}`);
    await db.set(`guildLeave_${message.guild.id}`, channel.id);
    message.channel.send(`Leaver Channel Changed to <#` + channel.id + `>`);
    
}
};

exports.help = {
  name: "leaver",
  aliases: []
};

exports.conf = {
  usage: "leaver **or** leaver #channel **or** leaver disable",
  aliases: "None.",
  description: "Shows/Sets the Leaver Channel.",
  category: "Configuration"
};