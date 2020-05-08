const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.mentions.members.first();
  let auth = message.member;
  if(!user) return xtal.cmdErr(message, 'Mention a User to Transfer', 'transfer');
  let amt = args.join(" ").slice(22);
  let amount = parseInt(amt, 10);
  if(!amount || isNaN(amount)) return xtal.cmdErr(message, 'Specify a Amount to Transfer', 'transfer');
  let balance = await xtal.eco.fetch(`eco_${auth.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${auth.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  if (message.content.includes('-')) return xtal.cmdErr(message, 'Enter a Positive Amount.', 'gamble');

  if(amount > balance) return xtal.cmdErr(message, 'You are Poor Mate.', 'gamble');

    await xtal.eco.subtract(`eco_${auth.user.id}`, amount)
    await xtal.eco.add(`eco_${user.user.id}`, amount)
    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setColor(colors.cyan)
    .setDescription(`**${amount}** Crystals were transferred to **${user.user.tag}** by **${auth.user.tag}**!`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed)
  
  };

exports.help = {
  name: "transfer",
  aliases: ['share']
};

exports.conf = {
  usage: "transfer @user [amount]",
  aliases: "share",
  description: "Transfer some Cash.",
  category: "Economy",
  cooldown: 15
};