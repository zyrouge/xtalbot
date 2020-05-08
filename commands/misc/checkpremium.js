const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emoji) => {

    xtal.xtalPremium.ensure('serverPremium', []);
    xtal.xtalPremium.ensure('userPremium', []);
    const premiumservers = xtal.xtalPremium.get('serverPremium');
    const premiumusers = xtal.xtalPremium.get('userPremium');
    let embed = new RichEmbed()
    .setAuthor(`Check Premium`)
    .setColor(colors.cyan)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    const which = args[0];
    if(!which) return xtal.cmdErr(message, "Improper Usage.", this.help.name);
  
    if(which == 'user') {
        const user = message.mentions.members.first() || message.member;
        if(premiumusers.includes(user.id)) embed.setDescription(`${emoji.verified} **${user.user.tag}** has Premium Access.`)
        else embed.setDescription(`**${user.user.tag}** does not have Premium Access.`);
    } else if(which == 'guild') {
        const guild = message.guild;
        if(premiumservers.includes(guild.id)) embed.setDescription(`${emoji.verified} **${guild.name}** has Premium Access.`)
        else embed.setDescription(`**${guild.name}** does not have Premium Access.`);
    } else embed.setDescription(`Incorrect Usage. **[${this.conf.usage}]**`);
    
    return message.channel.send(embed);

};

exports.help = {
  name: "checkpremium",
  aliases: ['cpremium']
};

exports.conf = {
  usage: "checkpremium [user/guild] <@user>",
  description: "Check for Premium.",
  category: "Misc"
};