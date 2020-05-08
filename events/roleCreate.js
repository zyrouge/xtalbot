const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, role) => {
    
  if (!role.guild) return;
  let mod = await db.fetch(`guildLogs_${role.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {
  let embed = new Discord.RichEmbed()
  .setTitle('Role Created')
  .setThumbnail(role.guild.iconURL)
  .setTimestamp()
  .addField('Name', `${role.name}`)
  .addField('ID', `${role.id}`)
  .addField('Color', `${role.hexColor}`)
  .addField('Position', `${role.position}`)
  .setColor(colors.magenta)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }}
};