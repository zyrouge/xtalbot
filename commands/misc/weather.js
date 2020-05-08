const { RichEmbed } = require('discord.js');
const weather = require('weather-js');

exports.run = async (xtal, message, args, colors, emojis) => {
  
    if(!args.join(" ")) return message.channel.send(`Specify a Place.`)
    weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
        if (err) return message.channel.send(err);

        if (result === undefined || result.length === 0) {
            message.channel.send('**Please enter a valid location.**')
            return;
        }

        var current = result[0].current;
        var location = result[0].location;

        let embed = new RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(colors.cyan)
            .addField('Timezone',`UTC${location.timezone}`, true)
            .addField('Degree Type',location.degreetype, true)
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setFooter(xtal.user.username, xtal.user.avatarURL);

            return message.channel.send({embed});
    });
  
};

exports.help = {
  name: "weather",
  aliases: []
};

exports.conf = {
  usage: "weather [place]",
  aliases: "None.",
  description: "Shows the Weather.",
  category: "Misc"
};