exports.run = async (xtal, message, args) => {
  
  const superagent = require('superagent');
  const { RichEmbed } = require("discord.js");
  const { body } = await superagent.get('https://yesno.wtf/api');
  let embed = new RichEmbed()
    .setAuthor(body.answer === 'no' ? 'No.' : 'Yes!', message.author.avatarURL)
    .setTimestamp()
    .setImage(body.image)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
  message.channel.send(embed);
  
};

exports.help = {
  name: "yesno",
  aliases: []
};

exports.conf = {
  usage: "yesno",
  description: "Yes or No?",
  category: "Text"
};