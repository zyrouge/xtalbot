const db = require('quick.db');
const { RichEmbed } = require('discord.js');

exports.run = async (xtal, message, args, colors, emojis) => {

const defaulttxt = "**{{user}}** left **{{server}}**";

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
    if(args[0] && args[0].toLowerCase() == "reset") {

    let dbchannel = await db.fetch(`guildLeave_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') return message.channel.send(`Leaver Channel is not yet Set!`);

        await db.set(`guildLeaveMessage_${message.guild.id}`, defaulttxt);
        message.channel.send(`Leaver Message has been set to **Default**.`);
        return;

    } else if(args[0] && args[0].toLowerCase() == "help") {

const description = `
{{user}} - User Tag [${message.author.tag}]
{{mentionuser}} - @User [${message.author}]
{{server}} - Server Name [${message.guild.name}]
{{memcount}} - Server Member Count [${message.guild.memberCount}]
`; //End

        let embed = new RichEmbed()
        .setAuthor(`Leaver Help`, message.guild.iconURL)
        .setTimestamp()
        .setColor(colors.cyan)
        .setDescription(description)
        .addField(`Default Text`, defaulttxt)
        .setFooter(xtal.user.username, xtal.user.avatarURL)
        message.channel.send({embed});
        return;

    } else {

    let dbchannel = await db.fetch(`guildLeave_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') return message.channel.send(`Leaver Channel is not yet Set!`);

    let welcomerargs = args.join(" ");
    let weltext = await db.fetch(`guildLeaveMessage_${message.guild.id}`);
    if(weltext == null || weltext == 'Default.') { weltext = defaulttxt };
    if(!welcomerargs) return message.channel.send(`Leaver Message on this guild is \`${weltext}\``);
    await db.set(`guildLeaveMessage_${message.guild.id}`, welcomerargs);
    message.channel.send(`Leaver Message has been changed to \`` + welcomerargs + `\``);
    
}
};

exports.help = {
  name: "leavertext",
  aliases: ['leavermessage', 'leavertext']
};

exports.conf = {
  usage: "leavertext **or** leavertext [text/reset/help]",
  aliases: "leavermessage, leavertext",
  description: "Shows/Sets the Leaver Message.",
  category: "Configuration"
};