const fetch = require("node-fetch");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if(!message.channel.nsfw) return message.channel.send(`❌ It is not a NSFW Channel!`);

    const { KSoftClient } = require('ksoft.js');
    const ksoft = new KSoftClient(process.env.KSOFT);
    let { url } = await ksoft.images.random('hentai_gif', { nsfw: true });

    let embed = new Discord.RichEmbed()
    .setAuthor(`Hnetai Gifs`, message.author.avatarURL)
    .setTimestamp()
    .setImage(url)
    .setColor(colors.white)
    .setFooter(`Ksoft.SI | ` + xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);
  
};

exports.help = {
  name: "hentai",
  aliases: []
};

exports.conf = {
  usage: "hentai",
  description: "Sends a Hentai Gif.",
  category: "NSFW"
};