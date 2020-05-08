const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
    let serverQueue = xtal.queue.get(message.guild.id);  
    if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
    serverQueue.songs = [];
    xtal.simpleEmbed(message, "Queue Cleared.");
  } catch(e) {}
 
};

exports.help = {
  name: "clearqueue",
  aliases: ['cqueue', 'resetqueue']
};

exports.conf = {
  usage: "clearqueue",
  description: "Clears the Queue.",
  category: "Music"
};