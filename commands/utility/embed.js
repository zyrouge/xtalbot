const { RichEmbed }  = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    const content = args.join(' ').split(' !! ');

    if(!content[0] || !content[1]) return message.channel.send(`Incorrect Usage.`)
    else {
    let embed = new RichEmbed()
     .setTitle(content[0])
     .setColor("RANDOM")
     .setDescription(content[1]);

    message.channel.send(embed)
    }
  
};

exports.help = {
  name: "embed",
  aliases: ['em']
};

exports.conf = {
  usage: "embed [title] !! [description]",
  aliases: "em",
  description: "Text to Embed.",
  category: "Utility"
};