const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    try {
        let notAnimated = [];
        let animated = [];
        message.guild.emojis.forEach(async emoji => {
          if (emoji.animated) animated.push(emoji.toString());
          else notAnimated.push(emoji.toString());
        });
        if (!animated[0]) animated = ['None'];
        if (!notAnimated[0]) notAnimated = ['None'];
        message.channel.send('**__Animated:__**\n' + animated.join(' ') + '\n**__Static:__**\n' + notAnimated.join(' '), {split:true});
      } catch (err) {
        message.channel.send('Their was an error!\n' + err).catch();
      }
      
};

exports.help = {
  name: "emojis",
  aliases: []
};

exports.conf = {
  usage: "emojis",
  description: "Shows the Emojis in the Server.",
  category: "Info"
};