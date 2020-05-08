exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
        message.channel.send(xtal.user.username + ' runs on **' + Object.keys(require('../package').dependencies).length + '** dependencies');
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "dependecies",
  aliases: ['deps']
};

exports.conf = {
  usage: "dependecies",
  aliases: "deps",
  description: "Shows the Bot Dependecies.",
  category: "Misc"
};