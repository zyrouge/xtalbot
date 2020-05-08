exports.run = async (xtal, message, args, colors, emojis) => {
  
  const text = args.join(' ')
  const converted = text.split('').reverse().join('');
  message.channel.send(`\u180E${converted}`);
  
};

exports.help = {
  name: "reverse",
  aliases: []
};

exports.conf = {
  usage: "reverse [text]",
  aliases: "None.",
  description: "Reverse the Text.",
  category: "Text"
};