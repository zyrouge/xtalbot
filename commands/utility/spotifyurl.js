const Discord = require('discord.js');
var { getData, getPreview } = require("spotify-url-info");

exports.run = async (xtal, message, args, colors) => {
  
  try {
    const url = args.join(" ");
    const regex = /^(https:\/\/(open|play)\.spotify\.com\/(track)\/)/;
    
    if(regex.test(url)) {
    const info = await getData(url).catch((e) => xtal.cmdErr(message, `Something went Wrong! (${e}).`, this.help.name));
    let artists = [];
    info.artists.forEach(x => {
      artists.push(x.name);
    });
    const embed = new Discord.RichEmbed()
      .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/627737823885262858.png')
      .addField('Song Name', `${info.name}`, true)
      .addField('Playable | Explicit', `${info.is_playable ? "Yes" : "No"} | ${info.explicit ? "Yes" : "No"}`, true)
      .addField('Song Duration', `${formattedUptime(info.duration_ms)}`, true)
      .addField('Release Date', `${info.album.release_date}`, true)
      .setColor(`${info.dominantColor}`)
      .setThumbnail(info.album.images ? (info.album.images[0] ? info.album.images[0].url : null) : null)
      .addField('Artists', `${artists.join(", ")}`, true)
      .addField('Links', `[Song Link](${info.album.external_urls.spotify}) | [Song Preview](${info.preview_url})`, true)
    
    message.channel.send(embed);
    
    } else {
      
      xtal.simpleEmbed(message, `Invaild Spotify URL.`);
      
    }
  } catch (e) {
      xtal.cmdErr(message, `Something went Wrong!.`, this.help.name);
  }

  
};

exports.help = {
  name: "spotifyurl",
  aliases: ['spurl']
};

exports.conf = {
  usage: "spotifyurl <url>",
  aliases: "sp",
  description: "Shows the Spotify URL Song Information.",
  category: "Utility"
};

function formattedUptime(ms) {
  let m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s %= 60;
  const h = Math.floor(m / 60);
  m %= 60;
  const hours = `${h === 0 ? '' : h} ${h === 1 ? 'hour,' : h === 0 ? '' : 'hours,'}`;
  const minutes = `${m === 0 ? '' : m} ${m === 1 ? 'minute and' : m === 0 ? '' : 'minutes and'}`;
  const seconds = `${s} ${s === 1 ? 'second' : 'seconds'}`;
  return `${hours} ${minutes} ${seconds}`.trim();
}