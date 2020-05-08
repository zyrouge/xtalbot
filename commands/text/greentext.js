exports.run = async (xtal, message, args) => {
  
    let green = args.join(' ');
    if(!green) text = 'Provide some Text';
    message.channel.sendCode('css', green)
  
};

exports.help = {
  name: "greentext",
  aliases: ['greenify']
};

exports.conf = {
  usage: "greentext [text]",
  aliases: "greenify",
  description: "Greenify the Text.",
  category: "Text"
};