const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
    if(!message.channel.nsfw) {return message.channel.send(`❌ It is not a NSFW Channel!`)}
    else {
  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first().user.username;
  else user = "themselves";
  
  const { url } = await fetch(`https://nekos.life/api/v2/img/spank`).then(response => response.json());
  
  let embed = new RichEmbed()
    .setColor(colors.pink)
    .setAuthor(`Aww, ${message.author.username} spanks ${user}.`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setImage(url)
    .setTimestamp();
   message.channel.send({ embed });
    }

};

exports.help = {
  name: "spank",
  aliases: []
};

exports.conf = {
  usage: "spank @user",
  aliases: "None.",
  description: "Spank a User.",
  category: "Reactions"
};