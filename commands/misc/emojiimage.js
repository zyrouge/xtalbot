const { Attachment } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
        let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(args[1]);
        
        if (!id) return message.reply('You did\'nt input a valid emoji or it is a default Discord emote!');
        switch (args[0]) {
          case 'animated':
            message.channel.send(new Attachment('https://cdn.discordapp.com/emojis/' + id + '.gif'));
            break;
          case 'static':
            message.channel.send(new Attachment('https://cdn.discordapp.com/emojis/' + id + '.png'));
            break;
          default:
            message.reply('You need to supply the type of emoji it is!');
            break;
        }
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "emojiimage",
  aliases: []
};

exports.conf = {
  usage: "emojiimage [static/animated] [emoji/id]",
  aliases: "None.",
  description: "Enlarges the Emoji.",
  category: "Misc"
};