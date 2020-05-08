const fetch = require('node-fetch')
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
    try {
        if (message.member.hasPermission('CREATE_INSTANT_INVITE')) {
          message.channel.createInvite().then(invite => message.channel.send(`Invite Code: ${invite.code}`));
        } else message.reply('No Permissions.');
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }

};

exports.help = {
  name: "serverinvite",
  aliases: ['sinvite']
};

exports.conf = {
  usage: "serverinvite",
  aliases: "sinvite",
  description: "Creates a Server Invitation.",
  category: "Utility"
};