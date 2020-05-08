const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.member;
  if(!args[0] || isNaN(args[0])) return xtal.cmdErr(message, 'Specify a Amount to Gamble', 'gamble');
  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;
  let amount = parseInt(args[0], 10);

  if (message.content.includes('-')) return xtal.cmdErr(message, 'Enter a Positive Amount.', 'gamble');

  if(amount > balance) return xtal.cmdErr(message, 'You are Poor Mate.', 'gamble');

  let possible = Math.floor((Math.random() * 5));

    if(possible == 4) {

    await xtal.eco.subtract(`eco_${user.user.id}`, amount)
    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setColor(colors.cyan)
    .setDescription(`You lost your Gamble! **${amount}** Crystals were taken from your Wallet!`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed)
    
    } else {

    await xtal.eco.add(`eco_${user.user.id}`, amount)
    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setColor(colors.cyan)
    .setDescription(`You Won! **${amount}** Crystals were added to your Wallet!`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed)
}

};

exports.help = {
    name: "gamble",
    aliases: []
};
  
exports.conf = {
    usage: "gamble [amount]",
    aliases: "None.",
    description: "Gamble Crystals for Profit.",
    category: "Economy",
    cooldown: 60
};