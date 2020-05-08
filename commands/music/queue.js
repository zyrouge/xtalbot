const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('There is nothing playing.');
  let musicno = 0;
  let currentplaying;
  if(serverQueue.songs[musicno]) currentplaying = `**[${serverQueue.songs[musicno].title}](${serverQueue.songs[musicno].url})**`
  else currentplaying = `Cannot Determine that`;
  let str = [];

  for(const songs of serverQueue.songs) {
    str.push(`[${songs.title}](${songs.url})`);
  }

  if (str.length !== 0) {
    xtal.rrPage(message, str, 15, `Song Queue of ${message.guild.name}`)
  } else {
    return xtal.simpleEmbed(message, 'There is nothing playing.');
  }
} catch(e) {}

};

exports.help = {
  name: "queue",
  aliases: ['qu']
};

exports.conf = {
  usage: "queue",
  aliases: "qu",
  description: "Shows the Current Queue.",
  category: "Music"
};