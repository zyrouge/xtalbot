const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {

  const { fact } = await fetch(`https://nekos.life/api/v2/fact`).then(response => response.json());
  
  let embed = new RichEmbed()
    .setColor(colors.black)
    .setAuthor(`Fun Fact!`, message.author.avatarURL)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setDescription(fact)
    .setTimestamp();
   message.channel.send({ embed });

};

exports.help = {
  name: "fact",
  aliases: []
};

exports.conf = {
  usage: "fact",
  aliases: "None.",
  description: "Fun Facts",
  category: "Text"
};