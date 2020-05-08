const request = require("request");
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    request({ uri: "http://www.yerkee.com/api/fortune", json: true }, (error, response, body) => {
      if (error) throw new Error(error);
      let fortune = body.fortune;
      let embed = new RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(fortune)
      .setFooter(xtal.user.username, xtal.user.avatarURL)
      .setTimestamp()
      .setColor(colors.white);
      message.channel.send(embed);
  });
  
};

exports.help = {
  name: "fortune",
  aliases: []
};

exports.conf = {
  usage: "fortune",
  aliases: "None.",
  description: "Check your Fortune.",
  category: "Games"
};