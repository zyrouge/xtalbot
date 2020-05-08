const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, user, newUser) => {

  if(!newUser.guild) return;
  let mod = await db.fetch(`guildLogs_${newUser.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {

if (user.nickname !== newUser.nickname) {

let embed = new Discord.RichEmbed()
  .setTitle('Member Nickname Updated')
  .setTimestamp()
  .setDescription(`User: ${newUser.user.tag} | ID: ${newUser.id}`)
  .setThumbnail(user.user.avatarURL)
  .addField('Before', user.nickname)
  .addField('After', newUser.nickname)
  .setColor(colors.green)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)
}

if (user.user.tag !== newUser.user.tag) {

    let embed = new Discord.RichEmbed()
    .setTitle('Member Tag Updated')
    .setTimestamp()
    .addField(`Before`, `User: ${user.user.tag} | ID: ${user.id}`)
    .addField(`After`, `User: ${newUser.user.tag} | ID: ${newUser.id}`)
    .setThumbnail(user.user.avatarURL)
    .setColor(colors.magneta)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    
    channel.send(embed)

}

if (user.roles !== newUser.roles) {

    let output = '';
    let outputNew = '';
    
    user.roles.forEach(role => {
      output += '\n' + role.name;
    });
    
    newUser.roles.forEach(role => {
      outputNew += '\n' + role.name;
    });
    
    if (output == outputNew) return;
    
    let embed = new Discord.RichEmbed()
    .setTitle('Member Roles Updated')
    .setDescription(`User: ${newUser.user.tag} | ID: ${newUser.id}`)
    .addField(`Before`, output)
    .addField(`After`, outputNew)
    .setColor(colors.green)
    .setThumbnail(newUser.user.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    channel.send(embed)
    
}

if (user.user.avatarURL !== newUser.user.avatarURL) {

    let embed = new Discord.RichEmbed()
    .setTitle('Member Avatar Updated')
    .setTimestamp()
    .setDescription(`User: ${newUser.user.tag} | ID: ${newUser.id}`)
    .addField(`Before`, `${user.user.avatarURL}`)
    .addField(`After`, `${newUser.user.avatarURL}`)
    .setThumbnail(user.user.avatarURL)
    .setImage(newUser.user.avatarURL)
    .setColor(colors.cyan)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    
    channel.send(embed)

}

}}
};