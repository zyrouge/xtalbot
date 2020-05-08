const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
  const earth = "https://static.boredpanda.com/blog/wp-content/uploads/2018/06/Flat-Earth-Funny-Memes2-5b3339ddf2934__700.jpg";
  
  let embed = new RichEmbed()
    .setColor(colors.black)
    .setAuthor(`Explain this!`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setImage(earth)
    .setTimestamp();     
   message.channel.send({ embed });

};

exports.help = {
  name: "flatearth",
  aliases: []
};

exports.conf = {
  usage: "flatearth",
  aliases: "None.",
  description: "Flat Earth.",
  category: "Image"
};