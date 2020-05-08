const config = require("../../config.json");

exports.run = async (xtal, message, args) => {
  
  message.channel.send({embed:{
    color:16777215,
    title:`My Bongo Invite Link:`,
    description:`[Click To Invite](${config.invite}) | [Join Our Support Server](${config.server})`,
    footer:{text:'Bongo Cat'}
  }});
  
  };

exports.help = {
  name: "invite",
  aliases: ['botinvite']
};

exports.conf = {
  usage: "invite",
  aliases: "botinvite",
  description: "Sends the Bot Invite Link.",
  category: "Misc"
};