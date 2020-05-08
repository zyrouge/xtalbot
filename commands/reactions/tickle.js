const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first().user.username;
  else user = "themselves";
  
  const { url } = await fetch(`https://nekos.life/api/v2/img/tickle`).then(response => response.json());
  
  let embed = new RichEmbed()
    .setColor(colors.pink)
    .setAuthor(`Aww, ${message.author.username} tickles ${user}.`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setImage(url)
    .setTimestamp();
   message.channel.send({ embed });

};

exports.help = {
  name: "tickle",
  aliases: []
};

exports.conf = {
  usage: "tickle @user",
  aliases: "None.",
  description: "Tickle a User.",
  category: "Reactions"
};