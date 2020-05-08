exports.run = async (xtal, message, args, colors) => {
 
    try {
        message.channel.fetchMessages({limit: 2}).then(async messages => {
            if (!Array.from(messages.keys())[1]) return message.reply('No Messages Found!');
            let msg = messages.get(Array.from(messages.keys())[1]);
            let emoji;
            if(xtal.emojis.find(x => x.name.includes(args[0].toLowerCase()))) emoji = xtal.emojis.find(x => x.name.includes(args[0].toLowerCase()))
            if(xtal.emojis.find(x => x.name.toLowerCase() == args[0].toLowerCase())) emoji = xtal.emojis.find(x => x.name.toLowerCase() == args[0].toLowerCase())
            if(!emoji) return message.reply('No Emojis Found!');
            msg.react(emoji.id).catch(() => {
              return message.reply('There was an error!').then(msg => {
                msg.delete(2000)
              })
            });
            message.channel.send('I\'ve Reacted to the message!').then(msg => {
                msg.delete(2000)
              })
            message.delete();
          });
    } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }

};

exports.help = {
  name: "nreact",
  aliases: ['nre']
};

exports.conf = {
  usage: "nreact [emoji]",
  description: "React with Nitro Emojis!",
  category: "Nitro"
};