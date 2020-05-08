const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);  
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.member.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
	if (serverQueue) {
    serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
    return undefined;
  }
  if (message.guild.me.voiceChannel && message.guild.me.voiceChannel == message.member.voiceChannel) {
    let vcname = message.guild.me.voiceChannel.name;
    message.guild.me.voiceChannel.leave();
    xtal.simpleEmbed(message, `Disconnected from **${vcname}**`);
  } else return message.channel.send('There is nothing playing that I could stop for you.');
  } catch(e) {}
  
};

exports.help = {
  name: "stop",
  aliases: ['st', 'leave', 'disconnect', 'dc']
};

exports.conf = {
  usage: "stop",
  aliases: "st, leave, disconnect, dc",
  description: "Stops the Current Song and Clears the Queue.",
  category: "Music"
};