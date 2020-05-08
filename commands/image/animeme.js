const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

exports.run = (xtal, message, args, colors) => {

randomPuppy('animemes')
            .then(url => {
                const embed = new Discord.RichEmbed()
                .setColor(colors.white)
                .setTimestamp(new Date())
                .setAuthor(`Anime Meme`, message.author.avatarURL)
                .setImage(url)
                .setFooter(xtal.user.username, xtal.user.avatarURL);
    return message.channel.send({ embed });
            })

};

exports.help = {
  name: "animememe",
  aliases: ["animeme"]
};

exports.conf = {
  usage: "animememe",
  aliases: "animeme",
  description: "A Dank Anime Meme.",
  category: "Image"
};