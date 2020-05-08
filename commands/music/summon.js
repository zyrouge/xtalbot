exports.run = async (xtal, message, args, colors, emojis) => {
  
  try {
		if (!message.member.voiceChannel || message.guild.me.voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = message.member.voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
    xtal.simpleEmbed(message, `Connected to **${message.member.voiceChannel.name}**`);
    message.member.voiceChannel.join();
  } catch(e) {
    console.log(e);
  }
  
};

exports.help = {
  name: "summon",
  aliases: ['join', 'connect']
};

exports.conf = {
  usage: "summon",
  aliases: "join, connect",
  description: "Join the User Voice Channel.",
  category: "Music"
};