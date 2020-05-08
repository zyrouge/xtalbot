const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  let user = message.mentions.members.first() || message.member; 
  let rate = Math.floor((Math.random() * 100));
  let embed = new RichEmbed()
  .setAuthor(`Gay Machine`, user.user.displayAvatarURL)
  .setDescription(`${user}, you are **${rate}%** Gay!`)
  .setTimestamp()
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL);

  message.channel.send(embed)
  
};

exports.help = {
  name: "gayrate",
  aliases: ['gaypercent']
};

exports.conf = {
  usage: "gayrate @user",
  aliases: "gaypercent",
  description: "Check your Gay Rate.",
  category: "Fun"
};