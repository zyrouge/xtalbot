const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);


exports.run = async (xtal, message, args) => {
  
  try {
  let serverQueue = xtal.queue.get(message.guild.id);  
  if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
    if(!args[0] || isNaN(args[0])) return xtal.cmdErr(message, `Provide a Valid Song Number.`, 'removesong');
    try {
        let position = parseInt(args[0] - 1);
        let target = xtal.queue.get(message.guild.id).songs[position];
        let musicno = 0;
        if(position == musicno) return message.channel.send(`You can't remove the Current Playing Song.`);
        if(target) {
            serverQueue.songs.splice(target, 1);
            message.channel.send(`Song Removed: ${target.title}`)
        } else message.channel.send(`Invalid Song Number.`);
    } catch (e) {
        xtal.cmdErr(message, `Err: ${e}`, 'removesong')
    }
  } catch(e) {}
 
};

exports.help = {
  name: "removesong",
  aliases: ['songremove', 'remove']
};

exports.conf = {
  usage: "removesong",
  aliases: "songremove, remove",
  description: "Removes Song from the Queue.",
  category: "Music"
};