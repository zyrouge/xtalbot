const Discord = require("discord.js");

exports.run = async (xtal, message, args) => {
  
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:x: You need **MANAGE_GUILD** permission to use this command.`)
  if (!args.join(" ")) return message.channel.send(":x: Please provide rolename.")
	let role = message.guild.roles.find(m => m.name.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.roles.find(m => m.name.toLowerCase().includes(args.join(" ")))
  if (!role) return message.channel.send("❌ I can't find that role.")
	if(message.guild.me.highestRole.position <= role.position) return message.channel.send(':x: I dont have permissions to manage that role!');
  if(role.position >= message.member.highestRole.position) return message.channel.send(':x: You cant play with that role!');
  if (role.editable) {
    await role.setMentionable(true, 'Role needs to be mentioned.');
    await message.channel.send(`**${message.author.tag}** mentioned <@&${role.id}>`)
    await role.setMentionable(false, 'Role doesn\'t needs to be mentioned anymore.');
  } else xtal.cmdErr(message, `No Permissions`, this.help.name);
};

exports.help = {
  name: "mention",
  aliases: ['men']
};

exports.conf = {
  usage: "mention [role name]",
  aliases: "men",
  description: "Mentions the Role.",
  category: "Utility"
};