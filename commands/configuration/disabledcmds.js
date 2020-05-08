const Enmap = require("enmap");
const db = require("quick.db");
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  try {
    xtal.disabledcmd.ensure(message.guild.id, []);
    let cmds = xtal.disabledcmd.get(message.guild.id).join("\n");
    if(!cmds) return xtal.simpleEmbed(message, `No Disabled Commands.`);
    let embed = new RichEmbed()
    .setAuthor(`AutoRoles List`, message.guild.iconURL)
    .setTimestamp()
    .setDescription(`\`\`\`${cmds}\`\`\``)
    .setColor(colors.white)
    .setFooter(xtal.user.username,  xtal.user.avatarURL);
    message.channel.send(embed);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.help = {
  name: "disablecmds",
  aliases: ['cmdsdisabled', 'disabledcmds']
};

exports.conf = {
  usage: "disablecmds",
  examples: ['disablecmds'],
  description: "Shows Disabled Commands in the Guild.",
  category: "Configuration"
};
