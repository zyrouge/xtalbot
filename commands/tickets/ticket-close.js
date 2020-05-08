const {caseNumber} = require('../../util/caseNumber.js');
const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  let checkticket = await db.fetch(`guildTickets_${message.guild.id}`);
  if(checkticket == null || checkticket == 0) {
    xtal.cmdErr(message, "Tickets are not Enabled!", 'ticket-close');
    return;
  }
  let checkrole = await db.fetch(`guildTicketsRole_${message.guild.id}`);
  let checkedrole = message.guild.roles.get(checkrole);
  if(checkrole == null || !checkedrole) {
    xtal.cmdErr(message, "Ticket Role is not Configured!", 'ticket-close');
    return;
  }
  
    if(!message.channel.name.startsWith('ticket-')) {

        const notTicket = new Discord.RichEmbed()
            .setColor(colors.red)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setFooter(xtal.user.username, xtal.user.avatarURL)
            .setDescription(`:x: **This command can only be used within a ticket channel**`)

        return message.channel.send(notTicket);
    }

    try {
    
      message.channel.delete();

    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.find('id', fetchchannel).catch();
    if(!modlog) return;
    const caseNum = await caseNumber(xtal, modlog);
    const modembed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(colors.cyan)
    .setDescription(`**Action:** Ticket [Closed]\n**Moderator:** ${message.author.tag}\n**Deleted Channel:** ${message.channel.name} | ${message.channel.id}`)
    .setFooter(`Case ${caseNum}`);

    modlog.send(modembed)
  } catch(error) {
    message.channel.send(`Error: `+ error);
}
//message.channel.delete()
  
};

exports.help = {
  name: "ticket-close",
  aliases: ['tickets-close', 't-close']
};

exports.conf = {
  usage: "ticket-close",
  aliases: "tickets-close, t-close",
  description: "Adds a User a Ticket.",
  category: "Tickets"
};