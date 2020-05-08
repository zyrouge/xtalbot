const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    if (!args.join(' ')) return message.reply('You need to supply the question');
    
    let embed = new RichEmbed()
    .setAuthor(`Poll by ${message.author.tag}`, message.author.avatarURL)
    .setDescription(args.join(' '))
    .setColor(colors.cyan)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    let msg = await message.channel.send(embed);
    
    await msg.react('627738650607747072');
    await msg.react('627738770061656079');

    message.delete();
  
};

exports.help = {
  name: "poll",
  aliases: []
};

exports.conf = {
  usage: "poll [question]",
  aliases: "None.",
  description: "Creates a Poll.",
  category: "Utility"
};