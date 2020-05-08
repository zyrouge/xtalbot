const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, emoji) => {

  if(!emoji.guild) return;
  let mod = await db.fetch(`guildLogs_${emoji.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  
  let embed = new Discord.RichEmbed()
  .setTitle('Emoji Created')
  .setTimestamp()
  .addField('Emoji', `${emoji}`)
  .addField('Name', `${emoji.name}`)
  .addField('ID', `${emoji.id}`)
  .addField('URL', `${emoji.url}`)
  .setColor(colors.green)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }}
};