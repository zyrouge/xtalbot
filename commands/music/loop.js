const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

    try {
    const serverQueue = xtal.queue.get(message.guild.id);
    if (!message.member.voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing that I could loop for you.');
        
    let loop = serverQueue.loop;
    if(!loop) loop = 0;
    if(!args[0]) {
        if(loop == 0) {
            serverQueue.loop = 1;
            message.channel.send(`Now looping the Queue.`);
            return;
        }
        else if(loop == 1) {
            serverQueue.loop = 2;
            message.channel.send(`Now looping the Track.`);
            return;
        }
        else if(loop == 2) {
            serverQueue.loop = 0;
            message.channel.send(`Loop Disabled.`);
            return;
        } else {
            message.channel.send(`Some Error Occured.`);
            return;
        }
    }
    if(args[0]) {
        let check = args[0];
        switch(check) {
            case 'disable':
                serverQueue.loop = 0;
                message.channel.send('Loop Disabled.');
                break;
            case 'song':
                serverQueue.loop = 2;
                message.channel.send('Now looping the Track.');
                break;
            case 'track':
                serverQueue.loop = 2;
                message.channel.send('Now looping the Track.');
                break;
            case 'queue':
                serverQueue.loop = 1;
                message.channel.send('Now looping the Queue.');
                break;
            default:
                switch(loop){
                    case 0: var loopkek = 'Disable.'; break;
                    case 1: var loopkek = 'Queue.'; break;
                    case 2: var loopkek = 'Song.'; break;
                }
                message.channel.send(`Looping: **${loopkek}**`);
                break;
        }
        return;
    }

    return xtal.cmdErr(message, 'Unknown Error.', 'loop');
} catch(e) {}
};

exports.help = {
  name: "loop",
  aliases: ['repeat']
};

exports.conf = {
  usage: "loop",
  aliases: "repeat",
  description: "Loops the Queue.",
  category: "Music"
};