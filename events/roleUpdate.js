const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, oldRole, newRole) => {

  if (!newRole.guild) return;
  let mod = await db.fetch(`guildLogs_${newRole.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  let embed = new Discord.RichEmbed()
  .setTitle('Role Updated')
  .setThumbnail(newRole.guild.iconURL)
  .setTimestamp()
  .addField(`Before`, `Name: ${oldRole.name}\nID: ${oldRole.id}\nHex: ${oldRole.hexColor}\nPosition: ${oldRole.position}`)
  .addField(`After`, `Name: ${newRole.name}\nID: ${newRole.id}\nHex: ${newRole.hexColor}\nPosition: ${newRole.position}`)
  .setColor(colors.magenta)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }}
};