const config = require("../../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db');

exports.run = async (xtal, message, args, colors) => {
  
  let prefix = await db.fetch(`guildPrefix_${message.guild.id}`);
  if(prefix == null) prefix = "x?";

  let arg = args.join("").toLowerCase();
  let i = 0;
  let j = 0;
  
  if(arg) {
    let kekes = '';
    let commands = xtal.commands.map(c => c.help.name.toLowerCase()).filter(c => c.includes(arg));
    if(commands.length == 0) {
      kekes = "None.";
    } else {
    commands.forEach(cmds => {
        if (kekes.length < 1985){ kekes += `${++i}. ${prefix}**${cmds}**\n`; }
        else return false;
    });
    }
    
    let okoks = '';
    let aliases = xtal.commands.map(c => `${c.help.aliases}`).filter(x => x !== '').filter(k => k.includes(arg)).join(',').split(',').filter(k => k.includes(arg));
    if(aliases.length == 0) {
      okoks = "None.";
    } else {
    aliases.forEach(alia => {
        if (okoks.length < 1985){ okoks += `${++j}. ${prefix}**${alia}**\n`; }
        else return false;
    });
    }
    let embed = new Discord.RichEmbed()
    .setAuthor(`${commands.length + aliases.length} Results Found!`, message.author.avatarURL)
    .addField(`Commands`, kekes)
    .addField(`Aliases`, okoks)
    .setColor(colors.cyan)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed);
  } else {
    xtal.simpleEmbed(message, "Seems like you didn\'t Provide any **Parameters**!")
  }
  
  };

exports.help = {
  name: "commandsearch",
  aliases: ['csearch', 'cmdsearch']
};

exports.conf = {
  usage: "commandsearch",
  description: "Search for a Command/Aliases.",
  category: "Help"
};