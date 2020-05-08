exports.run = async (xtal, message, args) => {
  
  if(!args.join(" ")) return xtal.cmdErr(message, "Provide some Text.", this.help.name)
  message.channel.send(`http://lmgtfy.com/?q=${args.map(encodeURIComponent).join('+')}`);
  
};

exports.help = {
  name: "lmgtfy",
  aliases: []
};

exports.conf = {
  usage: "lmgtfy [text]",
  description: "Lmgtfy Search.",
  category: "Text"
};