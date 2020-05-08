exports.run = async (xtal, message, args, colors, emojis) => {
  
    let text = args.join(' ');
    if (!text) text = 'Provide some Text to spacify!';
    message.channel.send(text.split('').join(' '));
  
};

exports.help = {
  name: "spacify",
  aliases: ['spacetext']
};

exports.conf = {
  usage: "spacify [text]",
  aliases: "spacetext",
  description: "Spacify the Text.",
  category: "Text"
};