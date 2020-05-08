const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first().user.username;
  else user = "themselves";
  
  const { body } = await fetch(`https://theweirdapi.glitch.me/api/roast`).then(response => response.json());
  
  let embed = new RichEmbed()
    .setColor(colors.gold)
    .setAuthor(`${message.author.username} roasts ${user}.`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setDescription(body)
    .setTimestamp();     
   message.channel.send({ embed });

};

exports.help = {
  name: "roast",
  aliases: ['troll']
};

exports.conf = {
  usage: "roast @user",
  aliases: "troll",
  description: "Roats the User.",
  category: "Fun"
};