const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let user = message.mentions.users.first() || message.author;
    let gay = await memer.gay(user.avatarURL)
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`Gay`, message.author.avatarURL)
    .setTimestamp()
    .setImage(gay)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "gay",
  aliases: ['gays', 'gayify']
};

exports.conf = {
  usage: "gay @user",
  aliases: "gays, gayify",
  description: "Gayify a User.",
  category: "Image"
};