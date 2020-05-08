const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, oldGuild, newGuild) => {

  if(!newGuild) return;
  let mod = await db.fetch(`guildLogs_${newGuild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {

  if (oldGuild.name !== newGuild.name) {
  
  let embed = new Discord.RichEmbed()
  .setTitle('Guild Renamed')
  .setTimestamp()
  .setThumbnail(newGuild.iconURL)
  .addField('Before', `${oldGuild.name} | ${oldGuild.id}`)
  .addField('After', `${newGuild.name} | ${newGuild.id}`)
  .setColor(colors.cyan)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  } else if (oldGuild.afkChannelID !== newGuild.afkChannelID) {

    let embed = new Discord.RichEmbed()
  .setTitle('Guild AFK Channel Changed')
  .setDescription(`${newGuild.name} | ${newGuild.id}`)
  .setTimestamp()
  .setThumbnail(newGuild.iconURL)
  .addField('Before', `${oldGuild.afkChannel} | ${oldGuild.afkChannelID}`)
  .addField('After', `${newGuild.afkChannel} | ${newGuild.afkChannelID}`)
  .setColor(colors.cyan)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  } else if (oldGuild.iconURL !== newGuild.iconURL) {

    let embed = new Discord.RichEmbed()
  .setTitle('Guild Icon Changed')
  .setTimestamp()
  .setDescription(`${newGuild.name} | ${newGuild.id}`)
  .setThumbnail(oldGuild.iconURL)
  .addField('Before', `${oldGuild.iconURL}`)
  .addField('After', `${newGuild.iconURL}`)
  .setColor(colors.cyan)
  .setImage(newGuild.iconURL)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  } else if (oldGuild.owner.id !== newGuild.owner.id) {

    let embed = new Discord.RichEmbed()
  .setTitle('Guild Owner Changed')
  .setTimestamp()
  .setDescription(`${newGuild.name} | ${newGuild.id}`)
  .setThumbnail(newGuild.iconURL)
  .addField('Before', `${oldGuild.owner} | ${oldGuild.owner.tag} | ${oldGuild.owner.id}`)
  .addField('After', `${newGuild.owner} | ${newGuild.owner.tag} | ${newGuild.owner.id}`)
  .setColor(colors.cyan)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  }

}}
};