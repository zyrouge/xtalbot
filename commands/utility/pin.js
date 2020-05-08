exports.run = async (xtal, message, args, colors, emojis) => {
  
  try {
    message.channel.fetchMessages({limit: 2}).then(async messages => {
      if (!Array.from(messages.keys())[1]) return message.reply('No Messages Found!');
      let msg = messages.get(Array.from(messages.keys())[1]);
      msg.pin().catch(() => {
        return message.reply('There was an error!');
      });
      message.channel.send('I\'ve pinned the message!');
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
  
};

exports.help = {
  name: "pin",
  aliases: []
};

exports.conf = {
  usage: "pin",
  description: "Pins the Last Message.",
  category: "Utility",
  cooldown: 3
};