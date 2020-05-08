const Enmap = require('enmap');
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
  xtal.tags = new Enmap({
    name: "tags",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
  });

  let str = [];

  if(!xtal.tags.get(message.guild.id)) return xtal.simpleEmbed(message, "No Tags Found in this Guild.");
  Object.keys(xtal.tags.get(message.guild.id)).forEach(tagid => {
    let tag = xtal.tags.get(message.guild.id)[tagid];
    if(tag && tag.name) str.push(`${tag.name}`);
  });

  if (str.length !== 0) {
    xtal.rrPage(message, str, 30, `All Tags in ${message.guild.name}`)
  } else {
    return xtal.simpleEmbed(message, "No Tags Found in this Guild.");
  }
  
};

exports.help = {
  name: "listtags",
  aliases: ['listcustomcommand', 'listcustomcmd']
};

exports.conf = {
  usage: "listtags",
  description: "Lists Guild Tag.",
  category: "CustomCommands"
};