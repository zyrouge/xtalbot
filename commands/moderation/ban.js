const { RichEmbed } = require('discord.js');
const db = require("quick.db");
const {caseNumber} = require('../../util/caseNumber.js'); 

exports.run = async (xtal, message, args) => {

  if(!message.member.hasPermission("BAN_MEMBERS")) return xtal.noPerms(message, "BAN_MEMBERS");
    
    let member = message.mentions.members.first() || message.guild.members.find('id', args[0]) || message.guild.members.find('name', args[0]);
    if(!member) return xtal.cmdErr(message, "Mention a User.", 'ban');
    if (member.id === message.author.id) {
      return xtal.cmdErr(message, 'You cannot do that to yourself.', 'ban');
    }
    if (member.highestRole.position >= message.member.highestRole.position) {
      return xtal.cmdErr(message, 'The targeted member has a higher or equal role position than you.', 'ban');
    }
    if (member.highestRole.position >= message.guild.me.highestRole.position) {
      return xtal.cmdErr(message, 'The targeted member has a higher or equal role position than me.', 'ban');
    }

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
    .catch(error => message.reply(`Sorry **${message.author}** I couldn't ban because of : *${error}*`));
    message.reply(`**${member.user.tag}** has been banned by **${message.author.tag}** because: *${reason}*`);

    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.get(fetchchannel);
    if(!modlog) return;
    const caseNum = await caseNumber(xtal, modlog);
    const modembed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
    modlog.send(modembed);

  };

exports.help = {
  name: "ban",
  aliases: ['bean']
};

exports.conf = {
  usage: "ban @user [reason]",
  aliases: "bean",
  description: "Bans the User.",
  category: "Moderation"
};