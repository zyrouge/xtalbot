const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  const { KSoftClient } = require('ksoft.js');
  const ksoft = new KSoftClient(process.env.KSOFT);
  let { url, article: { title, link } } = await ksoft.images.wikihow();

  let embed = new Discord.RichEmbed()
  .setTitle(`${title}`)
  .setURL(link)
  .setTimestamp()
  .setImage(url)
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL);

  message.channel.send(embed);
  
};

exports.help = {
  name: "wikihow",
  aliases: ['wh']
};

exports.conf = {
  usage: "wikihow",
  aliases: "None.",
  description: "Random WikiHows.",
  category: "Image"
};