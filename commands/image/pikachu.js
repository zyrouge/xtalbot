var api = require('some-random-api');
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
    api.pikachuimg().then(img => {
        const embed = new RichEmbed()
        .setColor(colors.gold)
        .setAuthor(`Pika Pika!`, message.author.avatarURL)
        .setFooter(xtal.user.username, xtal.user.avatarURL)
        .setImage(img)
        .setTimestamp();     
       message.channel.send({ embed });
    })
} catch (e) {
    console.log(e);
    m.edit(`Some Error Occured.`);
}
  
};

exports.help = {
  name: "pikachu",
  aliases: ['pika']
};

exports.conf = {
  usage: "pikachu",
  aliases: "pika",
  description: "Pikachu Images.",
  category: "Image"
};