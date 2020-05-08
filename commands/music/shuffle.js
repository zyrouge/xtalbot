const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  const serverQueue = xtal.queue.get(message.guild.id);
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
  if (!serverQueue) return message.channel.send('There is nothing playing that I could Shuffle for you.');
  if(serverQueue.songs.length == 1) return xtal.simpleEmbed(message, `I can\'t Shuffle a Queue with a Song.`);
  const np = serverQueue.songs.shift();
  shuffle(serverQueue.songs);
  shuffle(serverQueue.songs);
  shuffle(serverQueue.songs);
  serverQueue.songs.unshift(np);
  xtal.queue.set(message.guild.id, serverQueue);
  xtal.simpleEmbed(message, 'Queue **Shuffled.**')
  } catch(e) {

  }
  
};

exports.help = {
  name: "shuffle",
  aliases: ['sh']
};

exports.conf = {
  usage: "shuffle",
  description: "Shuffles the Song Queue.",
  category: "Music"
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}