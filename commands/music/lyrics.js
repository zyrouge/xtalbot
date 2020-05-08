const genius = require("genius-lyrics");
const Genius = new genius.Client(process.env.GENIUS);
const { RichEmbed } = require('discord.js');

exports.run = async (xtal, message, args, colors) => {
  
  try {
  let txt;
  const serverQueue = xtal.queue.get(message.guild.id);
  const m = await message.channel.send(`Searching Lyrics...`);
  if(args.join(" ")) {
    txt = args.join(" ");
  } else if (serverQueue && serverQueue.songs[0] && serverQueue.songs[0].title) {
    txt = serverQueue.songs[0].title;
  } else return m.edit(`No Song Query was Found!`);
  if(!txt) return m.edit(`No Song Query was Found!`);

  let errme = new RichEmbed()
  .setDescription(`No Lyrics Found.`)
  .setColor(colors.white);

  const search = await Genius.findTrack(`${txt}`);
  const result = await Genius.getAll(search);

  if(!result.full_title || !result.lyrics || result.lyrics.length == 0) return m.edit(errme);

  const title = result.title;
  const author = result.primary_artist.name;
  const image = result.song_art_image_url;
  let lyrics = result.lyrics.split("\n");
  if(!message.flags.includes("-k")) lyrics = lyrics.filter(line => !line.startsWith("["));

  const embed = new RichEmbed()
  .setTitle(`${title} - ${author}`)
  .setThumbnail(image)
  .setTimestamp()
  .setColor(colors.white);

  xtal.rrEmbed(message, lyrics, 30, embed);
  m.delete();
  return;
} catch (e) {
  console.error(e);
    message.channel.send('There was an error: ' + e);
}
   
};

exports.help = {
  name: "lyrics",
  aliases: ['ly']
};

exports.conf = {
  usage: "lyrics [name]",
  aliases: "ly",
  description: "Sends the Lyrics of the Song.",
  category: "Music"
};

/*
const genius = require("genius-lyrics");
const Genius = new genius.Client(process.env.GENIUS);

module.exports.run = async (client, message, args) => {

    let songname;
    if(args.join(" ")) songname = args.join(" ");
    if(!songname) return client.shortEmbed(client, message, `${client.emoji.cross} Provide a Song Name.`);
    const msg = await message.channel.send(`${client.emoji.search} Searching Lyrics for \`${songname}\`...`);

    try {
        const search = await Genius.findTrack(songname);
        const result = await Genius.getAll(search);
        if(!result.full_title || result.lyrics == 0) return client.shortEmbed(client, message, `${client.emoji.cross} Could find Lyrics for \`${songname}\`.`);
        msg.delete();
        const title = result.title;
        const author = result.primary_artist.name;
        const image = result.song_art_image_url;
        const lyrics = result.lyrics;
        client.rrTPage(client, message, lyrics, 1900, `${title} - ${author}`, image)
	} catch(e) {
        if(e != `Error: Invaild Song Object.`) client.logger.error(e);
        client.shortEmbed(client, message, `${client.emoji.cross} Could find Lyrics for \`${songname}\`.`).then(msg.delete());
    }
 };
 
 module.exports.help = {
    name: "lyrics",
    aliases: ['ly'],
    description: "Shows the Lyrics of the Song.",
    enabled: true
 };
 */