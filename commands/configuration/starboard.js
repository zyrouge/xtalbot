const db = require('quick.db');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
    if(args[0] && args[0].toLowerCase() == "disable") {

        await db.set(`guildStarboard_${message.guild.id}`, 'None.');
        message.channel.send(`Starboard Channel has set to be **None.**`);
        return;

    } else {

    let channel;
    if(message.mentions.channels.first()) { channel = message.mentions.channels.first() }
    else if(args[0]) { channel = message.guild.channels.find('id', args[0]) || message.guild.channels.find('name', args[0]) }
    let dbchannel = await db.fetch(`guildStarboard_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') { dbchannel = "**None.**" }
    else { dbchannel = `<#${dbchannel}>` };
    if(!channel) return message.channel.send(`Starboard Channel on this guild is ${dbchannel}`);
    await db.set(`guildStarboard_${message.guild.id}`, channel.id);
    message.channel.send(`Starboard Channel Changed to <#` + channel.id + `>`);
    
}
};

exports.help = {
  name: "starboard",
  aliases: []
};

exports.conf = {
  usage: "starboard **or** starboard #channel **or** starboard disable",
  aliases: "None.",
  description: "Shows/Sets the Starboard Channel.",
  category: "Configuration"
};