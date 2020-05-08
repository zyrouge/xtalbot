exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
        if (!args[1]) return message.reply('You need to input the channel type!');
        if (!args[0]) return message.reply('You need to input the channel name!');
        
        message.channel.send('I\'ve created the channel!').then(() => {
          message.guild.createChannel(args[1], args[0], []).catch((err) => {
            message.channel.send('There was an error!')
          });
        });
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "createchannel",
  aliases: []
};

exports.conf = {
  usage: "createchannel [name] [type]",
  aliases: "None.",
  description: "Creates a Channel.",
  category: "Managing"
};