const db = require('quick.db');
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {

  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first()
  else if(args[0]) user = message.guild.members.find('name', args[0]) || message.guild.members.find('id', args[0]);
  else user = message.member;

  let bio = await db.fetch(`userBio_${user.user.id}`);
  if(bio == null || !bio) bio = `**None.**`;
  
  let embed = new RichEmbed()
  .setAuthor(`${user.user.tag}'s Biography`, user.user.avatarURL)
  .setDescription(bio)
  .setTimestamp()
  .setColor(colors.cyan)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  message.channel.send(embed);
  return;

};

exports.help = {
  name: "showbio",
  aliases: ['showbiography', 'showdesc']
};

exports.conf = {
  usage: "showbio [text]",
  examples: ['showbio'],
  guildOnly: true,
  memberPermissions: [],
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  description: "Shows the User Biography.",
  category: "Configuration"
};