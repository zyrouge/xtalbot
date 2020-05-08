const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  const { KSoftClient } = require('ksoft.js');
  const ksoft = new KSoftClient(process.env.KSOFT);
  let { url, post: { title, subreddit, link, upvotes, downvotes } } = await ksoft.images.meme({ nsfw: false });

  let embed = new Discord.RichEmbed()
  .setAuthor(`${title}`, message.author.avatarURL)
  .setDescription(`[${subreddit}](${link}) | 👍 **${upvotes}** | 👎 **${downvotes}**`)
  .setTimestamp()
  .setImage(url)
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL);

  message.channel.send(embed);
  
};

exports.help = {
  name: "meme",
  aliases: []
};

exports.conf = {
  usage: "meme",
  aliases: "None.",
  description: "Meme Command.",
  category: "Image"
};