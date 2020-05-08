const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if(!message.channel.nsfw) { return message.channel.send(`❌ It is not a NSFW Channel!`)}
    else {
    const { KSoftClient } = require('ksoft.js');
    const ksoft = new KSoftClient(process.env.KSOFT);
    let result = await ksoft.images.nsfw();
      console.log(result)
    let { url, post: { title, subreddit, link, upvotes, downvotes } } = result;
    let embed = new Discord.RichEmbed()
    .setAuthor(`${title}`, message.author.avatarURL)
    .setDescription(`[${subreddit}](${link}) | 👍 **${upvotes}** | 👎 **${downvotes}**`)
    .setTimestamp()
    .setImage(url)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
    };
  
};

exports.help = {
  name: "hot",
  aliases: ['sexy', 'nsfw']
};

exports.conf = {
  usage: "hot",
  description: "Hot Image.",
  category: "NSFW"
};