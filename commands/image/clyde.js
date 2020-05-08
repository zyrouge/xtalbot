const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let text = args.join(" ");
    if(!text) return message.channel.send(`Provide Some Text.`);
    let image = await memer.clydify(text)
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`Clyde`, 'https://discordapp.com/assets/f78426a064bc9dd24847519259bc42af.png')
    .setTimestamp()
    .setImage(image)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "clyde",
  aliases: ['clydify', 'clydetext', 'ctext']
};

exports.conf = {
  usage: "clyde [text]",
  aliases: "clydify, clydetext, ctext",
  description: "Make Clyde say Something.",
  category: "Image"
};