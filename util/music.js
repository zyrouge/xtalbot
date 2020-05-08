const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const moment = require("moment");
const db = require("quick.db");
const { RichEmbed } = require("discord.js");
const colors = require("../colors.json");
const emojis = require("../emoji.json");

module.exports = (xtal) => {
  xtal.handleVideo = async (video, message, voiceChannel, playlist = false) => {
    const serverQueue = xtal.queue.get(message.guild.id);
    const song = {
      id: video.id,
      duration: video.duration,
      thumbnail: video.thumbnails.default.url,
      channel: video.channel.id,
      ct: video.channel.title,
      cu: video.channel.url,
      tp: video.publishedAt,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      user: message.author.id,
      durOwo: video.duration.hours * 3.6e6 + video.duration.minutes * 60000 + video.duration.seconds * 1000
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        start: Date.now(),
        now: undefined,
        volume: 100,
        playing: true,
        loop: 0
      };
      xtal.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        message.guild.me.setDeaf(true, "Xtal Music Player.");
        queueConstruct.connection = connection;
        queueConstruct.np = 0;
        setTimeout(() => { xtal.play(message.guild, queueConstruct.songs[0]);  }, 1000);
        xtal.queue.set(message.guild.id, queueConstruct);
      } catch (error) {
        xtal.queue.delete(message.guild.id);
        return message.channel.send(
          `I could not join the voice channel: ${error}`
        );
      }
    } else {
      serverQueue.songs.push(song);
      if (playlist) return undefined;
      else
        return message.channel.send(
          `${emojis.circle_tick} **${song.title}** has been added to the queue!`
        );
    }
    return undefined;
  };

  xtal.play = (guild, song) => {
    const serverQueue = xtal.queue.get(guild.id);
    const queue = xtal.queue;
    xtal.queue.get(guild.id).start = Date.now();

    if (!song) {
      serverQueue.textChannel.send(
        new RichEmbed()
          .setColor(colors.cyan)
          .setAuthor(`🎶 Queue Ended. Disconnected from ${serverQueue.voiceChannel.name}`, `https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fezgif.com-crop.gif?v=1572262285561`)
          .setTimestamp()
          .setFooter(xtal.user.username, xtal.user.avatarURL)
      );
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    let dispatcher = serverQueue.connection
      .playStream(
        ytdl(song.url, {
          filter: "audioonly",
          quality: "highestaudio"
        }),
        {
          bitrate: 128000,
          volume: 1,
          highWaterMark: 1 >> 25,
          passes: 3
        }
      )
      .on('end', () => {
        if (serverQueue.loop == 0) {
          setTimeout(() => {
            queue.get(guild.id).songs.shift();
            xtal.play(guild, queue.get(guild.id).songs[0]);
          }, 250);
        } else if (serverQueue.loop == 1) {
          setTimeout(() => {
            if(queue.get(guild.id).songs.length == 1) {
              xtal.play(guild, queue.get(guild.id).songs[0]);
            } else {
            let shifted = queue.get(guild.id).songs.shift();
            xtal.play(guild, queue.get(guild.id).songs[0]);
            queue.get(guild.id).songs.push(shifted);
            }
          }, 250);
        } else {
          setTimeout(() => {
            xtal.play(guild, queue.get(guild.id).songs[0]);
          }, 250);	
        }
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(queue.get(guild.id).volume / 100);
    queue.get(guild.id).dispatcher = dispatcher;
    let playembed = new RichEmbed()
      .setAuthor(`🎶 Now playing`, `https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fezgif.com-crop.gif?v=1572262285561`)
      .setTimestamp()
      .addField(`Title`, `[${song.title}](${song.url})`)
      .addField(
        `Channel`,
        `[${song.ct}](https://youtube.com/channel/${song.channel})`,
        true
      )
      .addField(
        `Duration`,
        `${song.duration.hours}h, ${song.duration.minutes}m, ${song.duration.seconds}s`,
        true
      )
      .addField(
        `Published At`,
        `${moment(song.tp).format("dddd, MMMM do YYYY")}`,
        true
      )
      .addField(
        `Song Index`,
        `${serverQueue.np ? serverQueue.np : 0}`,
        true
      )
      .addField(
        `Looping`,
        `${
          serverQueue.loop == 0
            ? "None."
            : serverQueue.loop == 1
            ? "Queue."
            : "Track"
        }`,
        true
      )
      .addField(
        `Requested by`,
        `**${xtal.users.get(song.user) ? xtal.users.get(song.user).tag : "None."}**`,
        true
      )
      .setColor(colors.lime)
      .setThumbnail(song.thumbnail)
      .setFooter(xtal.user.username, xtal.user.avatarURL);

    try {
      if (serverQueue.loop !== 2 || serverQueue.songs.length == 1) return serverQueue.textChannel.send(playembed);
    } catch (e) {
      serverQueue.textChannel.send(e);
    }
  };
};
