const {caseNumber} = require('../../util/caseNumber.js');
const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return xtal.noPerms(message, "MANAGE_GUILD");
    
    let checkticket = await db.fetch(`guildTickets_${message.guild.id}`);
    let checkrole = await db.fetch(`guildTicketsRole_${message.guild.id}`);

    if (args[0] && args[0] == "toggle") {
        
    if(args[1] && args[1] == 'enable') {

        await db.set(`guildTickets_${message.guild.id}`, 1);
        const embed = new Discord.RichEmbed()
            .setColor(colors.white)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setDescription(`Ticket System has been **Enabled!**`)
        return message.channel.send(embed);

    } else if(args[1] && args[1] == 'disable') {

        await db.set(`guildTickets_${message.guild.id}`, 0);
        const embed = new Discord.RichEmbed()
            .setColor(colors.white)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setDescription(`Ticket System has been **Disabled!**`)
        return message.channel.send(embed);

    } else return xtal.cmdErr(message, "Incorrect Usage", 'ticket');

    } else if (args[0] && args[0] == "role") {

    let role;
    if(args[1]) { role = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find('name', args[1]); }
    else { role = message.mentions.roles.first() }
    if(args[1] && !role) return xtal.cmdErr(message, "Mention a Valid Role or Role ID or Role Name.");

    if(role) {
        let modrole = role.id;
        await db.set(`guildTicketsRole_${message.guild.id}`, modrole);
        const embed = new Discord.RichEmbed()
            .setColor(colors.white)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setDescription(`Ticket System Mod Role has been set to ${role}`);
        return message.channel.send(embed);
    
    } else {
        let modrolexd;
        if(checkrole == null) { modrolexd = "**None.**" }
        else {
            let modrolexdd = message.guild.roles.get(checkrole);
            if(!modrolexdd) modrolexd = "**None.**"
            else modrolexd = modrolexdd;
        }

        const embed = new Discord.RichEmbed()
            .setColor(colors.white)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setDescription(`Ticket System Mod Role in this Guild is ${modrolexd}`);
        return message.channel.send(embed);

    }

    } else {

    let ticketf;
    if(checkticket == null || checkticket == 0) { ticketf = "Disabed" }
    else  { ticketf = "Enabled" }
    const embed = new Discord.RichEmbed()
    .setColor(colors.white)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setDescription(`Ticket System is **${ticketf}** on this Guild.`)
    return message.channel.send(embed);

    }
  
};

exports.help = {
  name: "ticket",
  aliases: ['tickets']
};

exports.conf = {
  usage: "ticket [toggle/role] [enable/disable/@role]",
  aliases: "tickets",
  description: "Toggles/Sets up Guild Ticket System.",
  category: "Tickets"
};