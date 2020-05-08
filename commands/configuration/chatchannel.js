const db = require('quick.db');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return message.channel.send(`No Permissions.`);
    if(args[0] && args[0].toLowerCase() == "disable") {
        await db.set(`guildChat_${message.guild.id}`, 'None.');
        message.channel.send(`Chat Channel has set to be **None.**`);
        return;
    } else {
    let chatc;
    if(message.mentions.channels.first()) { chatc = message.mentions.channels.first() }
    else if(args[0]) { chatc = message.guild.channels.find('id', args[0]) || message.guild.channels.find('name', args[0]) }
    let chat = await db.fetch(`guildChat_${message.guild.id}`);
    if(chat == null || chat == 'None.') { chat = "**None.**" }
    else { chat = `<#${chat}>` };
    if(!chatc) return message.channel.send(`Chat Channel on this guild is ${chat}`);
    await db.set(`guildChat_${message.guild.id}`, chatc.id);
    message.channel.send(`Chat Channel Changed to <#` + chatc.id + `>`);
    }
};

exports.help = {
  name: "chatchannel",
  aliases: ['setchat', 'botchat']
};

exports.conf = {
  usage: "chatchannel **or** chatchannel #channel **or** chatchannel disable",
  aliases: "setchat, botchat",
  description: "Shows/Sets the Bot Chat Channel.",
  category: "Configuration"
};