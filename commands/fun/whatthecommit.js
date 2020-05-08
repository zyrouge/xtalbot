const { RichEmbed } = require("discord.js");
const request = require('request');

exports.run = async (xtal, message, args, colors, emojis) => {

    request('http://whatthecommit.com/index.txt', (req, res, txt) => message.channel.send(txt));

};

exports.help = {
  name: "whatthecommit",
  aliases: ['wtc']
};

exports.conf = {
  usage: "whatthecommit",
  aliases: "wtc",
  description: "Commits to GitHub.",
  category: "Fun"
};
