const db = require('quick.db');
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    let user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    if(user.user.id == message.author.id) { return xtal.cmdErr(message, "You can\'t Rep yourself.", "rep") }
    let reps = await db.fetch(`guildReps_${message.guild.id}_${user.user.id}`);
    if(reps == null) reps = 0;
    let embed = new RichEmbed()
    .setAuthor(`Total Reps of ${user.user.tag}`, user.user.avatarURL)
    .setTimestamp()
    .setDescription(`Current Reps of ${user.user.tag}: **${reps}**`)
    .setColor(colors.cyan)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send({embed});
  
};

exports.help = {
  name: "reps",
  aliases: []
};

exports.conf = {
  usage: "reps @user",
  aliases: "None.",
  description: "User Reputation Count.",
  category: "Utility"
};