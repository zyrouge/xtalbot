const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let user = message.mentions.users.first() || message.author;
    let invert = await memer.invert(user.avatarURL)
  
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTimestamp()
    .setImage(invert)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "invert",
  aliases: []
};

exports.conf = {
  usage: "invert @user",
  aliases: "None.",
  description: "Invert the Users Avatar",
  category: "Image"
};