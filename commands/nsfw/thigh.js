const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if(!message.channel.nsfw) {return message.channel.send(`❌ It is not a NSFW Channel!`)}
    else {
    let image = await memer.thigh()
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`NSFW`, message.author.avatarURL)
    .setTimestamp()
    .setImage(image)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
    };
  
};

exports.help = {
  name: "thigh",
  aliases: []
};

exports.conf = {
  usage: "thigh",
  aliases: "None.",
  description: "Thigh Image.",
  category: "NSFW"
};