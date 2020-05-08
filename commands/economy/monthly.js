const { RichEmbed } = require("discord.js");
const ms = require('parse-ms'); //sexengine.co made by Srrrrkant with ♥ ;) = cancer + 8===D Vegan + bobs + vegana

exports.run = async (xtal, message, args, colors, emojis) => { 

  let user = message.member;
  let timeout = 2592000000;
  let amount = 5000;
  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  let monthly = await xtal.eco.fetch(`monthly_${message.author.id}`);

    if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
        let time = ms(timeout - (Date.now() - monthly));

        message.channel.send(`You already collected ur **Monthly** reward, you can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    
    } else {

    await xtal.eco.add(`eco_${user.user.id}`, amount)
    await xtal.eco.set(`monthly_${message.author.id}`, Date.now()) //this project is deprecated dumbo u think i give a fuck. ofcourse fuck
   //lik3 u
    let embed = new RichEmbed()
    .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid) //summa irru ra loosu
    .setColor(colors.cyan)
    .setDescription(`**${amount}** crystals were added to your Wallet!`) //stop it :crying_face:
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL)

    message.channel.send(embed)        
}
};

exports.help = {
  name: "monthly",
  aliases: []
};

exports.conf = {
  usage: "monthly",
  aliases: "None.",
  description: "Monthly Crystals.",
  category: "Economy"
};