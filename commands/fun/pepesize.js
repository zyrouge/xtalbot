const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  let user = message.mentions.members.first() || message.member; 
  let rate = Math.floor((Math.random() * 25));
  let pepe = '';

    for(i = 0; i < rate; i++) {
        pepe += "=";
    };

  let embed = new RichEmbed()
  .setAuthor(`Pepe Machine`, user.user.displayAvatarURL)
  .setDescription(`${user}, you're PePe is **8${pepe}B** long!`)
  .setTimestamp()
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL);

  message.channel.send(embed)
  
};

exports.help = {
  name: "pepesize",
  aliases: ['sizepepe', 'peepee']
};

exports.conf = {
  usage: "pepesize @user",
  aliases: "sizepepe, peepee",
  description: "Check your Pepe Size.",
  category: "Fun"
};