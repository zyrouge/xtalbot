exports.run = async (xtal, message, args) => {
  
  let text = args.join(" ");
  if(!text) return message.channel.send(`Provide Some Text`);
  let claps = text.split(' ').join(' 👏 ');
  message.channel.send(claps)
  
};

exports.help = {
  name: "clap",
  aliases: ['claps', 'claps', 'clapify']
};

exports.conf = {
  usage: "clap [text]",
  aliases: "claps, claps, clapify",
  description: "Clapify the Text.",
  category: "Text"
};