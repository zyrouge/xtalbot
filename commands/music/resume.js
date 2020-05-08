const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
  if (serverQueue && serverQueue.playing) {
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		return message.react('⏸');
  }
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.start = serverQueue.start + (Date.now() - serverQueue.now);
    serverQueue.now = undefined;
    serverQueue.connection.dispatcher.resume();
    return message.react('▶');
  }
  return message.channel.send('There is nothing playing.');
  } catch(e) {}

};

exports.help = {
  name: "resume",
  aliases: ['re']
};

exports.conf = {
  usage: "resume",
  aliases: "re",
  description: "Resumes the Song.",
  category: "Music"
};