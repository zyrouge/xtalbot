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

  if(amount > balance) return xtal.cmdErr(message, 'You are Poor Mate.', 'transfer');

    await xtal.eco.subtract(`eco_${user.user.id}`, amount)
    await xtal.eco.add(`bank_${user.user.id}`, amount);

    let afbalance = await xtal.eco.fetch(`eco_${user.user.id}`);
    if(afbalance == null) afbalance = 0;
    let afbankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
    if(afbankbalance == null) afbankbalance = 0;

    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setColor(colors.cyan)
    .setDescription(`Tranferred **${amount}** Crystals from your Wallet to Bank!`)
    .addField(`Current Repo`, `Wallet: **${afbalance}** Crystals\n Bank: **${afbankbalance}** Crystals`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed)

};

exports.help = {
  name: "deposit",
  aliases: ['dep']
};

exports.conf = {
  usage: "deposit [amount]",
  aliases: "None.",
  description: "Deposit Crystals from Wallet to Bank.",
  category: "Economy",
  cooldown: 10
};