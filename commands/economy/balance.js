const { RichEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.mentions.members.first() || message.member;

  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  let embed = new RichEmbed()
  .setAuthor(user.user.tag + "'s Account", `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
  .setTitle(`Xtal Crystals Repo`)
  .setTimestamp()
  .setColor(colors.cyan)
  .setDescription(`Wallet: **${balance}** Crystals \n Bank: **${bankbalance}** Crystals`)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  message.channel.send(embed);
  
  };

exports.help = {
  name: "balance",
  aliases: ['bal', 'cash']
};

exports.conf = {
  usage: "balance @user",
  aliases: "bal, cash",
  description: "Shows the Current Balance.",
  category: "Economy"
};