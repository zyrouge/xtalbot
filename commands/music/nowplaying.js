const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);
const { RichEmbed } = require("discord.js");
let moment = require("moment");
require("moment-duration-format");

exports.run = async (xtal, message, args, colors, emojis) => {
  let queue = xtal.queue.get(message.guild.id);
  if(!queue) return message.channel.send("Nothing playing rn.");
  let song = queue.songs[0];
  let time = song.durOwo;
  time = moment.duration(time).format("D[d] H[h] m[m] s[s]");
  
  let runtime = queue.dispatcher.time;
  runtime = moment.duration(runtime).format("D[d] H[h] m[m] s[s]");
  
  let bar = await createBar(queue.dispatcher.time, song.durOwo);
  
  message.channel.send({
    embed: new RichEmbed()
    .setTitle("Now playing")
    .setDescription(`[${song.title}](${song.url})`)
    .setFooter(`${runtime} ${bar} ${time}`, xtal.user.displayAvatarURL)
    .addField("Source", `[${song.ct}](${song.cu})`)
    .setColor(123456)
    .setThumbnail(song.thumbnail)
  })
  
};

exports.help = {
  name: "nowplaying",
  aliases: ['np']
};

exports.conf = {
  usage: "nowplaying",
  aliases: "np",
  description: "Sends the Currently Playing Song.",
  category: "Music"
};


async function createBar(prog, total) {
  let pp = "🔘";
    let kek = Math.floor((prog / total) * 20);
    let bar = "────────────────────".split("");
    if(kek >= 1 && kek <= 20) {
      bar.insert(kek, pp);
      bar = bar.join("")
    } else {
      bar = `${pp}────────────────────`;
    };
    return bar
  }