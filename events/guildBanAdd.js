const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, guild, user) => {

  if(!guild) return;
  let mod = await db.fetch(`guildLogs_${guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  
  let embed = new Discord.RichEmbed()
  .setTitle('Member Banned')
  .setTimestamp()
  .setThumbnail(user.avatarURL)
  .addField('Name', user.username)
  .addField('ID', user.id)
  .setColor(colors.red)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }}
};