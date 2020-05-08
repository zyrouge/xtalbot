const db = require("quick.db");
const Discord = require('discord.js');
const {caseNumber} = require('../../util/caseNumber.js');

exports.run = async (xtal, message, args, colors) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`No Permissions..`)
  let warnedmember = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!warnedmember) return message.channel.send(`Mention a User...`);
  if (warnedmember.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`That user is a Mod/Admin.`)
  if(warnedmember.id == message.author.id) return message.channel.send(`You can't warn Yourself...`);
  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';

    let warns = await db.fetch(`guildWarns_${warnedmember.id}_${message.guild.id}`);
    if(warns == null) warns = 0;

    let newwarn = ++warns;

    await db.set(`guildWarns_${warnedmember.id}_${message.guild.id}`, newwarn);

    let embed = new Discord.RichEmbed()
    .setAuthor("Warn", message.author.avatarURL)
    .setColor(colors.red)
    .setDescription(`${message.author} warned ${warnedmember}.`)
    .addField(`Reason`, reason)
    .addField(`Current Warns`, `**${newwarn}** Warnings.`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);

    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.get(fetchchannel);
    if(!modlog) return;
    const caseNum = await caseNumber(xtal, modlog);
    const modembed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Warn\n**Target:** ${warnedmember.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
    modlog.send(modembed);

};

exports.help = {
  name: "warn",
  aliases: []
};

exports.conf = {
  usage: "warn @user [reason]",
  aliases: "None.",
  description: "Warns the User.",
  category: "Moderation"
};