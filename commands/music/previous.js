const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
	if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
  serverQueue.loop = 0;
  let songs = xtal.queue.get(message.guild.id).songs;
  const first = songs.pop();
  const second = songs.pop();
  songs.reverse();
  songs.push(first);
  songs.push(second);
  songs.reverse();
  serverQueue.connection.dispatcher.end('skip');
  return undefined;
  } catch(e) {}
  
};

exports.help = {
  name: "previous",
  aliases: ['pr', 'back', 'reverse', 'revert']
};

exports.conf = {
  usage: "previous",
  description: "Plays the Previous Song.",
  category: "Music"
};