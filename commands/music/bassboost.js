const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
    const serverQueue = xtal.queue.get(message.guild.id);  
    if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
    let volume = 50;
    if(serverQueue.volume !== 150) volume = 150;
    serverQueue.volume = volume;
    xtal.queue.set(message.guild.id, serverQueue);
    serverQueue.connection.dispatcher.setVolumeLogarithmic(parseInt(volume) / 100);
		return message.channel.send(`**Bassboosting** ${volume == 150 ? 'Enabled!' : 'Disabled!'}`);
  } catch(e) {}

};

exports.help = {
  name: "bassboost",
  aliases: ['bboost']
};

exports.conf = {
  usage: "bassboost",
  description: "Toggles Bassboost.",
  category: "Music"
};