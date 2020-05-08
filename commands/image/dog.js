const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

exports.run = async(xtal, message, args) => {

  randomPuppy('dog')
            .then(url => {
                const embed = new Discord.RichEmbed()
                .setColor('#2e86c1')
                .setAuthor(`${message.author.tag} | Your dog!`, message.author.displayAvatarURL)
                .setImage(url)
    return message.channel.send({ embed });
            })
};

exports.help = {
	name: "dog",
    aliases: ['dogs']
};

exports.conf = {
    usage: "dog",
    aliases: "dogs",
    description: "Sends a Dog Image.",
    category: "Image"
};