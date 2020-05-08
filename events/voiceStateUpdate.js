const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, oldMember, newMember) => {

  if (!newMember.guild) return;
  let mod = await db.fetch(`guildLogs_${newMember.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {
  let channel = xtal.channels.get(mod);
  if(channel) {

  let oldchannel = oldMember.voiceChannel;
  let newchannel = newMember.voiceChannel;

  if(oldchannel === undefined && newchannel !== undefined) {

  let embed = new Discord.RichEmbed()
  .setTitle('Member Joined VC')
  .setThumbnail(newMember.user.displayAvatarURL)
  .setTimestamp()
  .addField(`Member Info`, `${newMember.user.tag} | ${newMember.user.id}`)
  .addField(`Voice Channel Info`, `${newchannel} | ${newchannel.name} | ${newchannel.id}`)
  .setColor(colors.magenta)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)

  } else if(oldchannel !== undefined && newchannel === undefined) {

    const serverQueue = xtal.queue.get(newMember.guild.id);
    if(serverQueue && newMember.guild.me.voiceChannel && newMember.guild.me.voiceChannel.members.size == 1) {
      serverQueue.songs = [];
      serverQueue.textChannel.send(`I left the Voice Channel as none are Listening.`);
      await serverQueue.connection.dispatcher.end();
    }

    let embed = new Discord.RichEmbed()
    .setTitle('Member Left VC')
    .setThumbnail(newMember.user.avatarURL)
    .setTimestamp()
    .addField(`Member Info`, `${newMember.user.tag} | ${newMember.user.id}`)
    .addField(`Voice Channel Info`, `${oldchannel} | ${oldchannel.name} | ${oldchannel.id}`)
    .setColor(colors.magenta)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    
    channel.send(embed)
  
    } else if (oldchannel !== undefined && newchannel !== undefined) {

    let embed = new Discord.RichEmbed()
    .setTitle('Member Moved VC')
    .setThumbnail(newMember.user.avatarURL)
    .setTimestamp()
    .addField(`Member Info`, `${newMember.user.tag} | ${newMember.user.id}`)
    .addField(`Before VC Info`, `${oldchannel} | ${oldchannel.name} | ${oldchannel.id}`)
    .addField(`After VC Info`, `${newchannel} | ${newchannel.name} | ${newchannel.id}`)
    .setColor(colors.magenta)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    channel.send(embed)

    }

  }}
};