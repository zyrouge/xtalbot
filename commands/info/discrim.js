const hastebin = require('hastebin-gen');
const { RichEmbed } = require('discord.js');

exports.run = async (xtal, message, args, colors, emojis) => {
  
    let discrim = args[0] || message.author.discriminator;
  
    const users = xtal.users.filter(user => user.discriminator === discrim).map(user => user.tag).join("\n");
    if(users.length == 0) users = "None.";
    if (users.length < 1985) {

       let embed = new RichEmbed()
       .setAuthor(`Users with #${discrim}`)
       .setDescription(users)
       .setColor(colors.white)
       .setFooter(xtal.user.username, xtal.user.avatarURL)
       .setTimestamp();
       return message.channel.send(embed);

    } else {

        hastebin(users, { extension: "txt" }).then(haste => {
            let embed = new RichEmbed()
            .setAuthor(`Users with #${discrim}`)
            .setDescription(`[Click Me](` + haste + `)`)
            .setColor(colors.white)
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setTimestamp();
            return message.channel.send(embed);
    })
};
  
};

exports.help = {
  name: "discrim",
  aliases: ['discriminator']
};

exports.conf = {
  usage: "discrim [#0000]",
  aliases: "discriminator",
  description: "Shows the Users with the Discriminator.",
  category: "Info"
};