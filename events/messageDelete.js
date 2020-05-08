const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, message) => {
  
  if (message.author.bot) return;
  if (!message.guild) return;
  
  let construct = {
    user: message.author.tag,
    avatar: message.author.displayAvatarURL,
    content: message.content
  }

  await db.set(`guildMessageDelete_${message.channel.id}`, construct);
  let mod = await db.fetch(`guildLogs_${message.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  let embed = new Discord.RichEmbed()
  .setTitle('Message Deleted')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .addField('Content', `${message.content}`)
  .addField('Author', `${message.author} | ${message.author.tag} | ${message.author.id}`)
  .addField('Channel', `${message.channel} | ${message.channel.name} | ${message.channel.id}`)
  .setColor(colors.red)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }}
};