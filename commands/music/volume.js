const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
    const serverQueue = xtal.queue.get(message.guild.id);  
    if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
    if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    if (args[0] > 100 || args[0] < 0) return message.channel.send(`Enter a Amount Between 1-100`);
    serverQueue.volume = args[0];
    xtal.queue.set(message.guild.id, serverQueue);
    serverQueue.connection.dispatcher.setVolumeLogarithmic(parseInt(args[0]) / 100);
		return message.channel.send(`I set the volume to: **${args[0]}**`);
  } catch(e) {}

};

exports.help = {
  name: "volume",
  aliases: ['vol']
};

exports.conf = {
  usage: "volume [amount]",
  aliases: "vol",
  description: "Shows/Sets the Voulme.",
  category: "Music"
};