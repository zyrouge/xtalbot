const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
  if (serverQueue && serverQueue.playing) {
		serverQueue.playing = false;
    serverQueue.now = Date.now();
		serverQueue.connection.dispatcher.pause();
		return message.react('⏸');
  }
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.react('▶');
  }
  return message.author.send('There is nothing playing.');
    
  } catch(e) {}
};

exports.help = {
  name: "pause",
  aliases: ['pa']
};

exports.conf = {
  usage: "pause",
  aliases: "pa",
  description: "Pauses the Current Song.",
  category: "Music"
};