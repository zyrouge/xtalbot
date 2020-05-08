const { Attachment } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
        let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(args[1]);
        
        switch (args[0]) {
          case 'animated':
            if (!id) return message.reply('You didn\'t input a valid emoji or it is a default Discord emoji!');
            if (!args.slice(2).join(' ')) return message.reply('You need to give the name of the emoji!');
            message.guild.createEmoji('https://cdn.discordapp.com/emojis/' + id + '.gif', args.slice(2).join(' '))
              .then(emoji => message.channel.send('Ive created the ' + emoji.name + ' emoji!'))
              .catch(err => message.reply('I couldn\'t create the emoji!\n' + err));
            break;
          case 'static':
            if (!id) return message.reply('You did\'nt input a valid emoji or it is a default Discord emoji!');
            message.guild.createEmoji('https://cdn.discordapp.com/emojis/' + id + '.png', args.slice(2).join(' '))
              .then(emoji => message.channel.send('I\'ve created the ' + emoji.name + ' emoji.'))
              .catch(err => message.reply('I couldn\'t create the emoji!\n' + err));
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
  name: "emojisteal",
  aliases: ['stealemoji']
};

exports.conf = {
  usage: "emojisteal [static/animated] [emoji/id]",
  aliases: "stealemoji",
  description: "Steals and Creates the Emoji in the Current Server.",
  category: "Misc"
};