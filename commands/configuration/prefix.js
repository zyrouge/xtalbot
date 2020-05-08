exports.run = async (xtal, message, args) => {

    const db = require('quick.db');
    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return message.channel.send(`No Permissions.`);
    let bprefix = args[0];
    let prefix = await db.fetch(`guildPrefix_${message.guild.id}`);
    if(prefix == null) prefix = "x?";
    if(!bprefix) return message.channel.send(`My prefix on this guild is \`${prefix}\``);
    await db.set(`guildPrefix_${message.guild.id}`, bprefix);
    message.channel.send(`Prefix Changed to \`${bprefix}\``);

};

exports.help = {
  name: "prefix",
  aliases: ['setprefix']
};

exports.conf = {
  usage: "prefix **or** prefix [new prefix]",
  aliases: "setprefix",
  description: "Shows/Sets the Prefix.",
  category: "Configuration"
};