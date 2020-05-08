const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.member;
  let amount = parseInt(args[0], 10);
  if(!amount || isNaN(amount)) return xtal.cmdErr(message, 'Specify a Amount to Deposit', 'deposit');
  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  if (message.content.includes('-')) return xtal.cmdErr(message, 'Enter a Positive Amount.', 'gamble');

  if(amount > bankbalance) return xtal.cmdErr(message, 'You are Poor Mate.', 'transfer');

    await xtal.eco.add(`eco_${user.user.id}`, amount)
    await xtal.eco.subtract(`bank_${user.user.id}`, amount);

    let afbalance = await xtal.eco.fetch(`eco_${user.user.id}`);
    if(afbalance == null) afbalance = 0;
    let afbankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
    if(afbankbalance == null) afbankbalance = 0;

    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setColor(colors.cyan)
    .setDescription(`Tranferred **${amount}** Crystals from your Bank to Wallet!`)
    .addField(`Current Repo`, `Wallet: **${afbalance}** Crystals\n Bank: **${afbankbalance}** Crystals`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed)

};

exports.help = {
  name: "withdraw",
  aliases: []
};

exports.conf = {
  usage: "withdraw [amount]",
  aliases: "None.",
  description: "Withdraw Crystals from Bank to Wallet.",
  category: "Economy",
  cooldown: 10
};