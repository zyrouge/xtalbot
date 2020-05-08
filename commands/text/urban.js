const Discord = require("discord.js");
const fetch = require('node-fetch');

exports.run = async (xtal, message, args, colors) => {
  
  let url;
  if(!args.join(" ")) url = 'https://api.urbandictionary.com/v0/random';
  else url = 'https://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(args.join(" "));

  let fetched = await fetch(url).then(res => res.json());
  if(!fetched.list[0]) return xtal.simpleEmbed(message, `No Results for \`${args.join(" ")}\``);
  const { definition, defid, permalink, thumbs_up, thumbs_down, word, example, author } = fetched.list[0];
  let embed = new Discord.RichEmbed()
  .setTitle(`${word}`)
  .setURL(permalink)
  .setDescription(`${definition.substring(0, 1900)}`)
  .addField(`Example`, `${example}`)
  .addField(`Info`, `ID: **${defid}**\nAuthor: **${author}**`)
  .addField(`Votes`, `👍 **${thumbs_up}** | 👎 **${thumbs_down}**`)
  .setTimestamp()
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL);

  message.channel.send(embed);
  
};

exports.help = {
  name: "urban",
  aliases: []
};

exports.conf = {
  usage: "urban <text>",
  description: "Search in Urban.",
  category: "Text"
};