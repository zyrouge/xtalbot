const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    if(!args[0] || !args[1]) return xtal.cmdErr(message, 'Incorrect Usage.', this.help.name);
    let name = args[0].toLowerCase();
    xtal.reactionRoles.ensure(message.guild.id, {});
    if(!xtal.reactionRoles.has(message.guild.id, name)) return xtal.simpleEmbed(message, `**${name}** Group does not Exists.`);
    const reactiondb = xtal.reactionRoles.get(message.guild.id, name);
    let argsly = parseInt(args[1], 10);
    if(!argsly || isNaN(argsly) || argsly == 0) xtal.cmdErr(message, 'Incorrect Usage', this.help.name);
    let delable = parseInt(argsly - 1);
    if(!reactiondb.roles[delable] || !reactiondb.emojis[delable]) return xtal.cmdErr(message, 'Incorrect Usage (Index doesnt Exist).', this.help.name);
    let role = message.guild.roles.get(reactiondb.roles[delable]);
    reactiondb.roles.splice(delable);
    reactiondb.emojis.splice(delable);
    xtal.reactionRoles.set(message.guild.id, reactiondb, name);
    let embed = new RichEmbed()
    .setAuthor(`Reaction Roles`, message.guild.iconURL)
    .setTimestamp()
    .setColor(colors.orange)
    .addField(`Group Name`, `**${name}**`)
    .addField(`Removed Role`, `${role}`)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed);

};

exports.help = {
  name: "removereactionrole",
  aliases: ['delrr', 'removerr']
};

exports.conf = {
  usage: "removereactionrole [group name] [index]",
  description: "Create Reaction Roles.",
  category: "ReactionRole"
};