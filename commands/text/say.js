exports.run = async (xtal, message, args) => {
  
  const { RichEmbed } = require("discord.js");
  const text = args.join(" ");
    message.delete().catch(O_o=>{});
    let embed = new RichEmbed()
    .setDescription(text)
    .setColor("RANDOM");
    message.channel.send(embed);
  
  };

exports.help = {
  name: "say",
  aliases: ['repeat']
};

exports.conf = {
  usage: "say [text]",
  aliases: "repeat",
  description: "Repeats the Text.",
  category: "Text"
};