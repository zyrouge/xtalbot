const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
	if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
  serverQueue.loop = 0;
  serverQueue.connection.dispatcher.end('skip');
  return undefined;
  } catch(e) {}
  
};

exports.help = {
  name: "skip",
  aliases: ['sk', 'next']
};

exports.conf = {
  usage: "skip",
  aliases: "sk",
  description: "Skips the Current Song.",
  category: "Music"
};