const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
var { getData, getPreview } = require("spotify-url-info");
var lookup = require('soundcloud-lookup');

exports.run = async (xtal, message, args, colors, emojis) => {
  try {
    const searchargs = message.content.split(" ");
    let searchString = searchargs.slice(1).join(" ");
    const serverQueue = xtal.queue.get(message.guild.id);
    const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, "$1") : "";
    const m = await message.channel.send(
      `Searching for \`${searchString}\`...`
    );

    const voiceChannel = message.member.voiceChannel;
    if (
      !voiceChannel ||
      (message.guild.me.voiceChannel &&
        message.guild.me.voiceChannel !== message.member.voiceChannel)
    )
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
      return message.channel.send(
        "I cannot connect to your voice channel, make sure I have the proper permissions!"
      );
    }
    if (!permissions.has("SPEAK")) {
      return message.channel.send(
        "I cannot speak in this voice channel, make sure I have the proper permissions!"
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await xtal.handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      message.channel.send(
        `${emojis.circle_tick} **${playlist.title}** (Playlist) has been added to the queue!`
      );
      m.delete();
      return;
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          if (
            /^(https:\/\/(open|play)\.spotify\.com\/(track)\/)/.test(
              searchString
            )
          ) {
            const info = await getData(url).catch(console.log);
            let artists = [];
            info.artists.forEach(x => artists.push(x.name));
            searchString = `${info.name} ${artists.join(" ")}`;
          }
          if (
            /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/.test(
              searchString
            )
          ) {
            lookup(searchString, process.env.SOUNDCLOUD, function(err, song) {
              searchString = `${song.title}`;
            });
          }
          var videos = await youtube.searchVideos(searchString, 1);
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          message.channel.send("🆘 I could not obtain any search results.");
          m.delete();
          return;
        }
      }
      xtal.handleVideo(video, message, voiceChannel);
      m.delete();
      return;
    }
  } catch (e) {}
};

exports.help = {
  name: "play",
  aliases: ["pl"]
};

exports.conf = {
  usage: "play [song/url]",
  aliases: "pl",
  description: "Plays the Song. Allowed URL: YouTube Spotify.",
  category: "Music"
};
