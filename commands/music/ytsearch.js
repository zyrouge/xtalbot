const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);
const { RichEmbed } = require("discord.js");


exports.run = async (xtal, message, args, colors) => {
	
try {
  const searchargs = message.content.split(' ');
  const searchString = searchargs.slice(1).join(' ');
  const serverQueue = xtal.queue.get(message.guild.id);
  const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, '$1') : '';
  
  const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel || (message.guild.me.voiceChannel && message.guild.me.voiceChannel !== message.member.voiceChannel)) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await xtal.handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					message.channel.send(new RichEmbed()
					.setDescription(`${videos.map(video2 => `**${++index} -** [${video2.title}](${video2.url})`).join('\n')}`)
					.setAuthor(`Song Selection (1 - 10)`, 'https://cdn.discordapp.com/emojis/627738060347539457.png')
					.setTimestamp()
          			.setColor(colors.red)
					.setFooter(xtal.user.username, xtal.user.avatarURL)
					);
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return xtal.handleVideo(video, message, voiceChannel);
		}
	} catch(e) {}
	
};

exports.help = {
	name: "ytsearch",
	aliases: ['yts', "youtubesearch"]
  };
  
  exports.conf = {
	  usage: "ytsearch [song/url/term]",
	  aliases: "yts, youtubesearch",
	  description: "Searches and Plays the Specified Song.",
	  category: "Music"
  };