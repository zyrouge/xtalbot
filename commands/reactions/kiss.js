const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first().user.username;
  else user = "themselves";
  
  const { url } = await fetch(`https://nekos.life/api/v2/img/kiss`).then(response => response.json());
  
  let embed = new RichEmbed()
    .setColor(colors.pink)
    .setAuthor(`Aww, ${message.author.username} kisses ${user}.`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setImage(url)
    .setTimestamp();     
   message.channel.send({ embed });

};

exports.help = {
  name: "kiss",
  aliases: []
};

exports.conf = {
  usage: "kiss @user",
  aliases: "None.",
  description: "Kiss a User.",
  category: "Reactions"
};