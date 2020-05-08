const Discord = require('discord.js');

module.exports.run = async (xtal, message, args) => {

  const randomPuppy = require('random-puppy');
  randomPuppy('cat')
            .then(url => {
                const embed = new Discord.RichEmbed()
                .setColor('#2e86c1')
                .setAuthor(`${message.author.tag} | Your Cat!`, message.author.displayAvatarURL)
                .setImage(url)
    return message.channel.send({ embed });
            })
};

exports.help = {
	name: "cat",
    aliases: ['cats']
};

exports.conf = {
    usage: "cat",
    aliases: "cats",
    description: "Sends a Cat Image.",
    category: "Image"
};