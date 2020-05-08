const arraySort = require("array-sort");

exports.run = async (xtal, message, args) => {
  
    let invites = await message.guild.fetchInvites();
    invites = invites.array();
    if(invites.length == 0) return xtal.simpleEmbed(message, `No Invites yet!`);
    arraySort(invites, 'uses', { reverse: true });
    let possibleInvites = [];
    invites.forEach(invite => {
        if(invite.inviter) possibleInvites.push(`\`${invite.code}\` has **__${invite.uses}__** Uses created by **${invite.inviter.username}**`);
    });

    xtal.rrPage(message, possibleInvites, 10, "Invites Leaderboard");

};

exports.help = {
name: "inviteboard",
aliases: ['invitelb', 'inviteslb', 'ilb']
};

exports.conf = {
usage: "inviteboard",
description: "Top Inviters of your Server.",
category: "Invites"
};