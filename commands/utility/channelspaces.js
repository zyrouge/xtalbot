const calculate = require('mathjs');
const { RichEmbed } = require('discord.js');

exports.run = async (xtal, message, args, colors) => {
  
    try {
    const space = "\u2009\u2009\u2009";
    let channel = message.mentions.channels.first() || message.channel;
    if(channel.name.includes('-')) {
      channel.edit({ name: channel.name.split("-").join("\u2009\u2009\u2009")})
    }
    xtal.simpleEmbed(message, `${channel} was Spaced!`);
    } catch(e) {
      xtal.cmdErr(message, `Something went Wrong!`, this.help.name);
    }
  
};

exports.help = {
  name: "channelspaces",
  aliases: ['channelspace']
};

exports.conf = {
  usage: "channelspaces",
  description: "Replaces - with Spaces.",
  category: "Utility"
};