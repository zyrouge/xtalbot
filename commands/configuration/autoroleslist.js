const Enmap = require("enmap");
const db = require("quick.db");
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

  xtal.autoroles = new Enmap({ name: "autoroles", fetchAll: false, autoFetch: true, cloneLevel: 'deep'});

  try {
    xtal.autoroles.ensure(message.guild.id, []);
    let i = 0;
    let cmds = xtal.autoroles.get(message.guild.id).map(x => message.guild.roles.get(x) ? `**${++i}.** ${message.guild.roles.get(x).name}` : null).join("\n");
    if(!cmds) return xtal.simpleEmbed(message, `No AutoRoles in this Guild.`);
    let embed = new RichEmbed()
    .setAuthor(`AutoRoles List`, message.guild.iconURL)
    .setTimestamp()
    .setDescription(cmds)
    .setColor(colors.white)
    .setFooter(xtal.user.username,  xtal.user.avatarURL);
    message.channel.send(embed);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.help = {
  name: "autoroleslist",
  aliases: ['autorolelist']
};

exports.conf = {
  usage: "autoroleslist",
  examples: ['autoroleslist','listautoroles','listautorole'],
  description: "Shows AutoRoles in the Guild.",
  category: "Configuration"
};
