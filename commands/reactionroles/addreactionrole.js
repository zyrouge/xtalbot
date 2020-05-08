const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    let argument = args.join(" ").split("|");
    if(!argument[0] || !argument[1] || !argument[2]) return xtal.cmdErr(message, 'Incorrect Usage.', this.help.name);
    let name = argument[0].toLowerCase();
    xtal.reactionRoles.ensure(message.guild.id, {});
    if(!xtal.reactionRoles.has(message.guild.id, name)) return xtal.simpleEmbed(message, `**${name}** Group does not Exists.`);
    const reactiondb = xtal.reactionRoles.get(message.guild.id, name);

    let role = message.guild.roles.find(m => m.name.toLowerCase() === argument[1].toLowerCase()) || message.guild.roles.find(m => m.name.toLowerCase().includes(argument[1]));
    if(!role) return xtal.simpleEmbed(message, `**${role}** Role does not Exists.`);
    
    let emoji = argument[2].split(':')[1];
    try {
    const customCheck = message.guild.emojis.find(e => e.name === emoji);
    if (!customCheck){
      await message.react(argument[2]);
      emoji = argument[2];
    }
    else await message.react(customCheck.id);
    } catch(e) {
      xtal.simpleEmbed(message, `**${argument[2]}** Emoji does not Exists. (${e})`);
      return;
    }
    reactiondb.roles.push(role.id);
    reactiondb.emojis.push(emoji);
    xtal.reactionRoles.set(message.guild.id, reactiondb, name);
    let embed = new RichEmbed()
    .setAuthor(`Reaction Roles`, message.guild.iconURL)
    .setTimestamp()
    .setColor(colors.orange)
    .addField(`Group Name`, `**${name}**`)
    .addField(`Added Role`, `${role}`)
    .addField(`Emoji`, `${emoji}`)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send(embed);

};

exports.help = {
  name: "addreactionrole",
  aliases: ['addrr']
};

exports.conf = {
  usage: "addreactionrole [group name]|[role name]|[emoji]",
  description: "Create Reaction Roles.",
  category: "ReactionRole"
};