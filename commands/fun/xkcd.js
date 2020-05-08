const request = require("request");
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if (args.length === 0) {
        request({ uri: "http://xkcd.com/info.0.json", json: true }, (error, response, body) => {
          if (error) throw new Error(error);
          const xkcdEmbed = new RichEmbed()
            .setColor(colors.white)
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setTitle(body.safe_title)
            .setURL(`https://xkcd.com/${body.num}`)
            .setDescription(body.alt)
            .setImage(body.img);
          message.channel.send(xkcdEmbed);
        });
      } else {
        if (args[0].match(/^\d+$/)) {
          request({ uri: `http://xkcd.com/${args[0]}/info.0.json`, json: true }, (error, response, body) => {
            if (error) throw new Error(error);
            const xkcdEmbed = new RichEmbed()
              .setColor(colors.white)
              .setFooter(xtal.user.username, xtal.user.avatarURL)
              .setTitle(body.safe_title)
              .setURL(`https://xkcd.com/${body.num}`)
              .setDescription(body.alt)
              .setImage(body.img);
            message.channel.send(xkcdEmbed);
          });
        } else {
          request({ uri: "http://xkcd.com/info.0.json", json: true }, (error, response, body) => {
            if (error) throw new Error(error);
            const xkcdEmbed = new RichEmbed()
              .setColor(colors.white)
              .setFooter(xtal.user.username, xtal.user.avatarURL)
              .setTitle(body.safe_title)
              .setURL(`https://xkcd.com/${body.num}`)
              .setDescription(body.alt)
              .setImage(body.img);
            message.channel.send(xkcdEmbed);
          });
        }
    }
  
};

exports.help = {
  name: "xkcd",
  aliases: []
};

exports.conf = {
  usage: "xkcd",
  aliases: "None.",
  description: "Xkcd Command.",
  category: "Fun"
};