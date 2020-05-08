const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

  let channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel;

  let embed = new Discord.RichEmbed()
  .setTitle(`${message.guild.name} Icon`)
  .setDescription(`\`\`${message.guild.iconURL}\`\``)
  .setImage(message.guild.iconURL + '?size=2048')
  .setURL(message.guild.iconURL)
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL)
  .setTimestamp()

message.channel.send(embed);

};

exports.help = {
  name: "guildicon",
  aliases: ['servericon']
};

exports.conf = {
  usage: "guildicon",
  description: "Guild Icon.",
  category: "Info"
};