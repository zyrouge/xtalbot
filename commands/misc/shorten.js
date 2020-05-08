var isgd = require("isgd");
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  if (!args[0]) return message.channel.send(`Incorrect usage.`);

  isgd.shorten(args[0], function(res) {
    if (res.startsWith("Error:")) return message.channel.send(`**${res}**`);

    let embed = new RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTimestamp()
      .setColor(colors.white)
      .addField(`URL:`, args[0], true)
      .addField(`Shorten URL:`, res, true)
      .setFooter(xtal.user.username, xtal.user.avatarURL);
    return message.channel.send(embed);
  });
};

exports.help = {
  name: "shorten",
  aliases: ["urls"]
};

exports.conf = {
  usage: "shorten [url]",
  aliases: "urls",
  description: "Shorten a URL.",
  category: "Misc"
};
