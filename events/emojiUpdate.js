const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, oldemoji, newemoji) => {

  if(!oldemoji.guild) return;
  let mod = await db.fetch(`guildLogs_${newemoji.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  
  let embed = new Discord.RichEmbed()
  .setTitle('Emoji Updated')
  .setTimestamp()
  .setDescription(newemoji)
  .addField('Before', `Name: ${oldemoji.name} \nURL: ${oldemoji.url}`)
  .addField('After', `Name: ${newemoji.name} \nURL: ${newemoji.url}`)
  .addField('ID', `${newemoji.id}`)
  .setColor(colors.red)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }}
};