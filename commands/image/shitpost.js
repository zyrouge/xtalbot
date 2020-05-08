const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  const { KSoftClient } = require('ksoft.js');
  const ksoft = new KSoftClient(process.env.KSOFT);
  let { url, post: { title, subreddit, link, upvotes, downvotes } } = await ksoft.images.reddit('shitposting', { removeNSFW: true, span: 'week' });
  
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
  name: "shitpost",
  aliases: ['smeme', 'spost']
};

exports.conf = {
  usage: "shitpost",
  description: "Programmer Meme Command.",
  category: "Image"
};