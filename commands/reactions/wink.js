
const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

    try {

    const { link } = await fetch(`https://some-random-api.ml/animu/wink`).then(response => response.json());

        const embed = new RichEmbed()
        .setColor(colors.cyan)
        .setAuthor(`${message.author.username} winks.`, message.author.avatarURL)
        .setFooter(xtal.user.username, xtal.user.avatarURL)
        .setImage(link)
        .setTimestamp();
       message.channel.send({ embed });

} catch (e) {
    console.log(e);
    m.edit(`Some Error Occured.`);
}
  
};

exports.help = {
  name: "wink",
  aliases: ['winks']
};

exports.conf = {
  usage: "wink",
  aliases: "winks",
  description: "Wink yourself.",
  category: "Reactions"
};