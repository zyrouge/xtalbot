const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, oldChannel, newChannel) => {

  if(!newChannel.guild) return;
  let mod = await db.fetch(`guildLogs_${newChannel.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let modchannel = xtal.channels.get(mod);
  if(modchannel) {

  if (oldChannel.name !== newChannel.name) {

  let embed = new Discord.RichEmbed()
  .setTitle('Channel Name Changed')
  .setTimestamp()
  .addField('Before', `${oldChannel} | ${oldChannel.name} | ${oldChannel.id}`)
  .addField('After', `${newChannel} | ${newChannel.name} | ${newChannel.id}`)
  .addField('ID', `${newChannel.id}`)
  .setColor(colors.red)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  modchannel.send(embed)

} else if (oldChannel.topic !== newChannel.topic) {

  let embed = new Discord.RichEmbed()
  .setTitle('Channel Topic Changed')
  .setTimestamp()
  .addField(`Channel Info`, `${newChannel} | ${newChannel.name} | ${newChannel.id}`)
  .addField('Topic Before', `${oldChannel.topic}`)
  .addField('Topic After', `${newChannel.topic}`)
  .setColor(colors.red)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  modchannel.send(embed)

} else if (oldChannel.position !== newChannel.position) {

  let embed = new Discord.RichEmbed()
  .setTitle('Channel Position Changed')
  .setTimestamp()
  .addField(`Channel Info`, `${newChannel} | ${newChannel.name} | ${newChannel.id}`)
  .addField('Position Before', `${oldChannel.position}`)
  .addField('Position After', `${newChannel.position}`)
  .setColor(colors.red)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  modchannel.send(embed)

}


}}
};