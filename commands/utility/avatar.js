exports.run = async (xtal, message, args, colors) => {
  
  const Discord = require('discord.js');
  
  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first()
  else if(args[0]) user = message.guild.members.find('name', args[0]) || message.guild.members.find('id', args[0]);
  else user = message.member;

  if(!user) return xtal.cmdErr(message, "Couldn't Determine the User.", 'avatar');

  const avatarembed = new Discord.RichEmbed()
    .setAuthor(user.user.tag, user.user.displayAvatarURL)
    .setColor(colors.white)
    .setTimestamp()
    .setImage(user.user.displayAvatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
   message.channel.send(avatarembed);
  
  };

exports.help = {
  name: "avatar",
  aliases: ['pfp']
};

exports.conf = {
  usage: "avatar @user",
  aliases: "pfp",
  description: "Sends the User Avatar.",
  category: "Utility"
};