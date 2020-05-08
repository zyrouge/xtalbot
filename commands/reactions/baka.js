const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first().user.username;
  else user = "themselves";
  
  const { url } = await fetch(`https://nekos.life/api/v2/img/baka`).then(response => response.json());
  
  let embed = new RichEmbed()
    .setColor(colors.pink)
    .setAuthor(`Aww, ${message.author.username} says ${user} Baka!`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setImage(url)
    .setTimestamp();     
   message.channel.send({ embed });

};

exports.help = {
  name: "baka",
  aliases: []
};

exports.conf = {
  usage: "baka @user",
  aliases: "None.",
  description: "Baka!",
  category: "Reactions"
};