const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let meme = await memer.joke()
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`Jokez`, message.author.avatarURL)
    .setTimestamp()
    .setDescription(meme)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "joke",
  aliases: ['dank']
};

exports.conf = {
  usage: "joke",
  aliases: "dank",
  description: "Joke Command.",
  category: "Text"
};