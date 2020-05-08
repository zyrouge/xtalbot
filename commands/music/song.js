const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);
const { RichEmbed } = require("discord.js");
const moment = require("moment");

exports.run = async (xtal, message, args, colors, emojis) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  let musicno = parseInt(args[0] - 1);
  if(!serverQueue.songs[musicno]) return message.channel.send(`Song doesn't Exist.`);

  let embed = new RichEmbed()
  .setTitle(`🎶 Song Inforamtion`)
  .setThumbnail(serverQueue.songs[musicno].thumbnail)
  .setDescription(`**[${serverQueue.songs[musicno].title}](${serverQueue.songs[musicno].url})**`)
  .setTimestamp()
  .setColor(colors.magenta)
  .addField(`Channel`, `[${serverQueue.songs[musicno].ct}](https://youtube.com/channel/${serverQueue.songs[musicno].channel})`)
  .addField(`Duration`, `${serverQueue.songs[musicno].duration.hours}h, ${serverQueue.songs[musicno].duration.minutes}m, ${serverQueue.songs[musicno].duration.seconds}s`)
  .addField(`Published At`, `${moment(serverQueue.songs[musicno].tp).format("dddd, MMMM do YYYY")}`)
  .addField(`URL`,`\`${serverQueue.songs[musicno].url}\` `)
  .addField(`Requested by`, `**${xtal.users.get(serverQueue.songs[musicno].user) ? xtal.users.get(serverQueue.songs[musicno].user).tag : "None."}**`)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
	return message.channel.send(embed);
} catch(e) {}

};

exports.help = {
  name: "song",
  aliases: ['songinfo']
};

exports.conf = {
  usage: "song [position]",
  aliases: "songinfo",
  description: "Shows the Information of the Song in Queue.",
  category: "Music"
};