const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let text = args.join(" ");
    if(!text) return message.channel.send(`Provide Some Text.`);
    let image = await memer.convertImage(text)
  
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTimestamp()
    .setImage(image)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "texttoimage",
  aliases: ['imagify', 'image', 'textimage']
};

exports.conf = {
  usage: "text [text]",
  aliases: "imagify, image, textimage",
  description: "Convert Text to Image.",
  category: "Image"
};