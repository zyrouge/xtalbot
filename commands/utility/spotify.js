const Discord = require('discord.js');

exports.run = async (xtal, message, args, colors) => {
  
  let user = message.mentions.users.first() || message.member;
  if (user.presence.game != null && user.presence.game.type == '2' && user.presence.game.name == 'Spotify' && user.presence.game.assets != null) {
    
    let trackIMG = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}`;
    let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
    let trackName = user.presence.game.details;
    let trackAuthor = user.presence.game.state;
    let trackAlbum = user.presence.game.assets.largeText;
    
    const embed = new Discord.RichEmbed()
      .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/627737823885262858.png')
      .setColor(colors.spotify)
      .setThumbnail(trackIMG)
      .addField('Song Name', `[${trackName}](${trackURL})`, true)
      .addField('Album', trackAlbum, true)
      .addField('Author', trackAuthor, false)
      .addField('Listen to Track:', `\`${trackURL}\``, false);
    
    message.channel.send(embed);
        
  } else {
    
    message.channel.send('**This user isn\'t listening to Spotify!**');
    
  }
  
};

exports.help = {
  name: "spotify",
  aliases: ['sp']
};

exports.conf = {
  usage: "spotify @user",
  aliases: "sp",
  description: "Shows the User Spotify Song Information.",
  category: "Utility"
};