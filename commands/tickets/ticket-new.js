const {caseNumber} = require('../../util/caseNumber.js');
const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

    let checkticket = await db.fetch(`guildTickets_${message.guild.id}`);
    if(checkticket == null || checkticket == 0) {
      xtal.cmdErr(message, "Tickets are not Enabled!", 'ticket-new');
      return;
    }
    let checkrole = await db.fetch(`guildTicketsRole_${message.guild.id}`);
    let checkedrole = message.guild.roles.get(checkrole);
    if(checkrole == null || !checkedrole) {
      xtal.cmdErr(message, "Ticket Role is not Configured!", 'ticket-new');
      return;
    }

    let topic = args.join(" ");
    if(!topic) return xtal.cmdErr(message, "Provide a Topic", 'ticket-new');
    let id = message.author.id.toString().substr(0,4) + message.author.discriminator;
    let chan = `ticket-${id}`;

    if(message.guild.channels.some(channel => chan.includes(channel.name))) {

        const err1 = new Discord.RichEmbed()
        .setColor(colors.red)
        .setDescription(`:x: You already have an open ticket.`)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        .setFooter(xtal.user.username, xtal.user.avatarURL);
        return message.channel.send(err1);

    };

    let ticketsCat = message.guild.channels.find('name', 'Tickets');
    if(!ticketsCat) {
    message.guild.createChannel('Tickets', 'category')
    }

    message.guild.createChannel(`ticket-${id}`, 'text').then(async c => {
    	c.setParent(message.guild.channels.find('name', 'Tickets'));
		let supportRole = message.guild.roles.get(checkrole)
    	if(!supportRole) return message.channel.send(":x: No **Support Team** role found.");

        if(message.guild.defaultRole) {
    	c.overwritePermissions(message.guild.defaultRole, {
      	VIEW_CHANNEL: false,
      	SEND_MESSAGES: false
    	})}
    	c.overwritePermissions(message.member, {
      	VIEW_CHANNEL: true,
      	SEND_MESSAGES: true
    	})
    	c.overwritePermissions(supportRole, {
      	VIEW_CHANNEL: true,
      	SEND_MESSAGES: true
    	})
    	c.setTopic(`${message.author} | ${topic}`);
				await c.send(`${supportRole}, a user has created a new ticket.\n`);
				await c.send(`__**Here's your ticket channel, ${message.author}**__`)

        const ticketText = "Thank you for reaching out to our support team.\nA member of staff will come to assist you shortly. Please describe the issue in detail and explain what you have done to resolve the issue so far.\n\n*If you feel that the support you receive is inadequate, please feel free to submit a formal complaint to a senior member of staff.*";
    	const created = new Discord.RichEmbed()
    	.setColor(colors.cyan)
    	.setDescription(`Your ticket (${c}) has been created.\nPlease read the information sent and follow any instructions given.`)
        .setTimestamp()
        .setFooter(xtal.user.username, xtal.user.avatarURL);
		const welcome = new Discord.RichEmbed()
        .setColor(colors.cyan)
        .setFooter(xtal.user.username, xtal.user.avatarURL)
        .setDescription(`**Ticket topic:** \`${topic}\`\n\n${ticketText}`)
        .setFooter(xtal.user.username, xtal.user.avatarURL);

    	message.channel.send(created)
		let w = await c.send(welcome)
        await w.pin();
    
    try {
    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.get(fetchchannel);
    if(!modlog) return;
    const caseNum = await caseNumber(xtal, modlog);
    const modembed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(colors.cyan)
    .setDescription(`**Action:** Ticket [Created]\n**User:** ${message.author.tag}\n**Topic:** ${topic}\n**Ticket Channel:** ${c} | ${c.id}`)
    .setFooter(`Case ${caseNum}`);

    modlog.send(modembed)
  } catch(error) {
    message.channel.send(`Error: `+ error);
}
});  
};

exports.help = {
  name: "ticket-new",
  aliases: ['tickets-new', 't-new']
};

exports.conf = {
  usage: "ticket-new",
  aliases: "tickets-new, t-new",
  description: "Creates a new Ticket.",
  category: "Tickets"
};