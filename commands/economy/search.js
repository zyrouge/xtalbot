const { RichEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.member;

  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  let money = Math.floor((Math.random() * 100));
  let decision = Math.floor((Math.random() * 3));

  if(decision == 0 || decision == 1) {

  let donor = donator();

  await xtal.eco.add(`eco_${user.user.id}`, money)

  let embed = new RichEmbed()
  .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
  .setTimestamp()
  .setColor(colors.cyan)
  .setDescription(`You searched and found **${money}** Crystals from **${donor}**`)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  message.channel.send(embed);

  } else {

  await xtal.eco.subtract(`eco_${user.user.id}`, money)

  let embed = new RichEmbed()
  .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
  .setTimestamp()
  .setColor(colors.cyan)
  .setDescription(`**Cops** found you! You lost **${money}** Crystals.`)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  message.channel.send(embed);

  }
  
  };

exports.help = {
  name: "search",
  aliases: []
};

exports.conf = {
  usage: "search",
  aliases: "None.",
  description: "Search for Crystals.",
  category: "Economy",
  cooldown: 60
};

function donator() {
    var rand = ["Basement", "Discord", "Dust Bin", "Me"]
    return rand[Math.floor(Math.random()*rand.length)];
}