const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let user = message.mentions.users.first() || message.author;
    let grey = await memer.greyscale(user.avatarURL)
  
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTimestamp()
    .setImage(grey)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "greyscale",
  aliases: ['grey', 'greyify']
};

exports.conf = {
  usage: "gray @user",
  aliases: "grey, greyify",
  description: "Gayifies the Users Avatar",
  category: "Image"
};