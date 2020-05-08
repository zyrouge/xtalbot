const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, newMessage, oldMessage) => {
  
  if (!newMessage.guild) return;
  let message = newMessage;
  if (message.author.bot) return;
  if(newMessage.cleanContent == oldMessage.cleanContent) return;
  
  let construct = {
    user: message.author.tag,
    avatar: message.author.displayAvatarURL,
    newContent: newMessage.content,
    oldContent: oldMessage.content
  }

  await db.set(`guildMessageEdit_${message.channel.id}`, construct);
  let mod = await db.fetch(`guildLogs_${message.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  try {
  let embed = new Discord.RichEmbed()
  .setTitle('Message Edited')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .addField('Before', `${newMessage.content}`)
  .addField('After', `${oldMessage.content}`)
  .addField('Author', `${message.author} | ${message.author.tag} | ${message.author.id}`)
  .addField('Channel', `${message.channel} | ${message.channel.name} | ${message.channel.id}`)
  .setColor(colors.green)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)
    
  } catch(e){
    channel.send(`Error: **e**`);
  }
  
}};

};