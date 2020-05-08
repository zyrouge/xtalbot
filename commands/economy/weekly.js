const { RichEmbed } = require("discord.js");
const ms = require('parse-ms');

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.member;
  let timeout = 604800000;
  let amount = 1500;

  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  let weekly = await xtal.eco.fetch(`weekly_${message.author.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        message.channel.send(`You already collected ur **Weekly** reward, you can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    
    } else {

    await xtal.eco.add(`eco_${user.user.id}`, amount)
    await xtal.eco.set(`weekly_${message.author.id}`, Date.now())

    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setColor(colors.cyan)
    .setDescription(`**${amount}** Crystals were added to your Wallet!`)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed)        
}
};

exports.help = {
  name: "weekly",
  aliases: []
};

exports.conf = {
  usage: "weekly",
  aliases: "None.",
  description: "Weekly Crystals.",
  category: "Economy"
};