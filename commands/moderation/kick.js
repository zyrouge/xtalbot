const { RichEmbed } = require('discord.js');
const db = require("quick.db");
const {caseNumber} = require('../../util/caseNumber.js');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return xtal.noPerms(message, "KICK_MEMBERS");
    let member = message.mentions.members.first() || args[0] ? message.guild.members.find('name', args[0]) || message.guild.members.find('id', args[0]) : undefined;
    if(!member) return xtal.cmdErr(message, 'Mention a User', 'kick');
    if (member.id === message.author.id) {
      return xtal.cmdErr(message, 'You cannot do that to yourself.', 'kick');
    }
    if (member.highestRole.position >= message.member.highestRole.position) {
      return xtal.cmdErr(message, 'The targeted member has a higher or equal role position than you.', 'kick');
    }
    if (member.highestRole.position >= message.guild.me.highestRole.position) {
      return xtal.cmdErr(message, 'The targeted member has a higher or equal role position than me.', 'kick');
    }

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    try {
    await member.kick(reason)
    message.reply(`**${member.user.tag}** has been kicked by **${message.author.tag}** because: *${reason}*`);
    } catch(e) {
      return message.reply(`Sorry **${message.author}** I couldn't kick because of : *${e}*`)
    }
    
    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.get(fetchchannel);
    if(!modlog) return;
    const caseNum = await caseNumber(xtal, modlog);
    const modembed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
    modlog.send(modembed);

  };

exports.help = {
  name: "kick",
  aliases: []
};

exports.conf = {
  usage: "kick @user [reason]",
  aliases: "None.",
  description: "Kicks the User.",
  category: "Moderation"
};