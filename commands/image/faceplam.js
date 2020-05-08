const Discord = require('discord.js');

module.exports.run = async (xtal, message, args) => {

  const randomPuppy = require('random-puppy');
  randomPuppy('facepalm')
            .then(url => {
                const embed = new Discord.RichEmbed()
                .setColor('#2e86c1')
                .setAuthor(`${message.author.tag} | Your dog!`, message.author.displayAvatarURL)
                .setImage(url)
    return message.channel.send({ embed });
            })
};

exports.help = {
	name: "facepalm",
    aliases: ['fp']
};

exports.conf = {
    usage: "facepalm",
    description: "Face Palm a User.",
    category: "Image"
};