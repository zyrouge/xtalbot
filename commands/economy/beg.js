const { RichEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.member;

  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;

  let money = Math.floor((Math.random() * 100));
  let donor = donator();

  await xtal.eco.add(`eco_${user.user.id}`, money)

  let embed = new RichEmbed()
  .setAuthor(`Xtal Crystals Repo`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
  .setTimestamp()
  .setColor(colors.cyan)
  .setDescription(`**${donor}** donated you **${money}** Crystals.`)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  message.channel.send(embed);
  
  };

exports.help = {
  name: "beg",
  aliases: []
};

exports.conf = {
  usage: "beg",
  aliases: "None.",
  description: "Beg for Crystals.",
  category: "Economy",
  cooldown: 60
};

function donator() {
    var rand = ["PewDiePie", "Zyrouge", "Xeno", "Thanos", "Rio", "Antiquency", "Aurumz", "Zkate", "Iron Man", "Lord Gaben", "Your Mom", "Voltrex", "Thiru", "Eon", "Kokktur", "TheAnimatedStick", "Clyde"]
    return rand[Math.floor(Math.random()*rand.length)];
}