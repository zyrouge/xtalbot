const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");

exports.run = async (xtal, message, args, colors) => {
  
  const data = await fetch('https://zkateki.glitch.me/api/yomama').then(response => response.json());
    let embed = new RichEmbed()
    .setAuthor(`Yomama Jokes`, message.author.displayAvatarURL)
    .setDescription(`**${data.joke}**`)
    .setTimestamp()
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed)
  
};

exports.help = {
  name: "yomama",
  aliases: []
};

exports.conf = {
  usage: "yomama",
  description: "Yomama Jokes.",
  category: "Fun"
};