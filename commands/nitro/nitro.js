exports.run = async (xtal, message, args, colors) => {
 
    try {
      let emoji;
      if(!args[0]) return xtal.simpleEmbed(message, `Specify a Emoji Name.`)
      if(xtal.emojis.find(x => x.name.includes(args[0].toLowerCase()))) emoji = xtal.emojis.find(x => x.name.includes(args[0].toLowerCase()))
      if(xtal.emojis.find(x => x.name.toLowerCase() == args[0].toLowerCase())) emoji = xtal.emojis.find(x => x.name.toLowerCase() == args[0].toLowerCase())
      if(!emoji) return message.reply('No Emojis Found!');
      message.channel.send(`${emoji}`);
      message.delete();
    } catch (err) {
      message.channel.send('There was an error!\n' + err).catch();
    }

};

exports.help = {
  name: "nitro",
  aliases: []
};

exports.conf = {
  usage: "nitro [emoji]",
  description: "Sends Nitro Emojis!",
  category: "Nitro"
};