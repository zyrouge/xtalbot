const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, channel) => {

  if(!channel.guild) return;
  let mod = await db.fetch(`guildLogs_${channel.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let modchannel = xtal.channels.get(mod);
  if(modchannel) {
  let embed = new Discord.RichEmbed()
  .setTitle('Channel Created')
  .setTimestamp()
  .addField('Channel', `<#${channel.id}>`)
  .addField('Name', `${channel.name}`)
  .addField('ID', `${channel.id}`)
  .setColor(colors.green)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  modchannel.send(embed)

  }}
};