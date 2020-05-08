const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    let user;
    if(message.mentions.members.first()) user = message.mentions.members.first()
    else if(args[0]) user = message.guild.members.find('name', args[0]) || message.guild.members.find('id', args[0]);
    else user = message.member;
    let invites = await message.guild.fetchInvites();
    invites = invites.array();
    if(invites.length == 0) return xtal.simpleEmbed(message, `No Invites yet!`);
    let invCount = 0;
    let inviteCodes = [];
    invites.filter(invite => invite.inviter && invite.inviter.id == user.user.id).forEach(invite => {
        if(invite && invite.inviter)
        {
            invCount += parseInt(invite.uses);
            inviteCodes.push(invite.code);
        }
    });
    
    let embed = new RichEmbed()
    .setAuthor(`Invites of ${user.user.username}`, user.user.avatarURL)
    .setTimestamp()
    .setDescription(`${user.user} has **${invCount}** Invites.`)
    .addField(`Codes`, inviteCodes.length > 0 ? inviteCodes.slice(0, 30).map(x => `\`${x}\``). join(", ") : "None.")
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);

};

exports.help = {
name: "invites",
aliases: []
};

exports.conf = {
usage: "invites",
description: "Your Total Invite Uses Count.",
category: "Invites"
};