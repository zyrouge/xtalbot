const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let user = message.mentions.users.first() || message.author;
    let wasted = await memer.wasted(user.avatarURL)
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`Wasted!`, message.author.avatarURL)
    .setTimestamp()
    .setImage(wasted)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "wasted",
  aliases: []
};

exports.conf = {
  usage: "wasted @user",
  aliases: "None.",
  description: "Wasted!",
  category: "Image"
};