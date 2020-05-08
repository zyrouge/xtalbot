const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if(!message.channel.nsfw) {return message.channel.send(`❌ It is not a NSFW Channel!`)}
    else {
    let image = await memer.hanal()
  
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
  name: "hanal",
  aliases: ['animeanal']
};

exports.conf = {
  usage: "hanal",
  aliases: "animeanal",
  description: "Anime Anal Image.",
  category: "NSFW"
};