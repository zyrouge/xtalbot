const db = require('quick.db');
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(user.user.id == message.author.id) { return xtal.cmdErr(message, "You can\'t Rep yourself.", "rep") }
    let reps = await db.fetch(`guildReps_${message.guild.id}_${user.user.id}`);
    if(reps == null) { reps = 0 }
    let repsset = ++reps;
    await db.set(`guildReps_${message.guild.id}_${user.user.id}`, repsset);
    let embed = new RichEmbed()
    .setAuthor(`Reps +1`, message.author.avatarURL)
    .setTimestamp()
    .addField(`${message.author.tag} repped ${user.user.tag}`, `Current Reps of ${user.user.tag}: **${repsset}**`)
    .setThumbnail(user.user.avatarURL)
    .setColor(colors.cyan)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send({embed});
  
};

exports.help = {
  name: "rep",
  aliases: []
};

exports.conf = {
  usage: "rep @user",
  aliases: "None.",
  description: "User Reputation.",
  category: "Utility",
  cooldown: 600
};