const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    let name = args.join("_").toLowerCase();
    if(!name) return xtal.simpleEmbed(message, 'Provide a **Group Name**.');
    xtal.reactionRoles.ensure(message.guild.id, {});
    if(xtal.reactionRoles.has(message.guild.id, name)) return xtal.simpleEmbed(message, `**${name}** Group Already Exists.`)
    xtal.reactionRoles.set(message.guild.id, {
        name: args.join(" "),
        roles: [],
        emojis: []
    }, name);

    let embed = new RichEmbed()
    .setAuthor(`Reaction Roles`, message.guild.iconURL)
    .setTimestamp()
    .setColor(colors.orange)
    .setDescription(`Group created with Name: **${name}**`)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed);

};

exports.help = {
  name: "createreactionrole",
  aliases: ['createrr']
};

exports.conf = {
  usage: "createreactionrole [name]",
  description: "Create Reaction Roles.",
  category: "ReactionRole"
};