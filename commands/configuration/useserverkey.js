const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emoji) => {

  if(!message.guild && message.channel.type !== "text") return xtal.cmdErr(message, 'Server Only Command', this.help.name);
  xtal.xtalPremium.ensure('serverPremium', []);
  xtal.xtalPremium.ensure('serverKeys', []);
  xtal.xtalPremium.ensure('serverKeysUsed', []);
  const key = args.join(" ");
  const guild = message.guild.id;
  const premiumservers = xtal.xtalPremium.get('serverPremium');
  const premiumkeys = xtal.xtalPremium.get('serverKeys');
  const usedkeys = xtal.xtalPremium.get('serverKeysUsed');
  if(premiumservers.includes(guild)) return xtal.simpleEmbed(message, 'This Guild already have **Premium Access.**');
  if(!premiumkeys.includes(key)) return xtal.simpleEmbed(message, '**Invalid Key.**');
  if(premiumkeys.includes(key)) {
    premiumservers.push(guild);
    usedkeys.push({key: key, auth: guild, date: new Date().toUTCString()});
    premiumkeys.splice(key, 1);
    xtal.xtalPremium.set('serverPremium', premiumservers);
    xtal.xtalPremium.set('serverKeys', premiumkeys);
    xtal.xtalPremium.set('serverKeysUsed', usedkeys);
    const embed = new RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(colors.gold)
    .addField(`${emoji.verified} Successfully Activated Premium Services!`,`**${tq()}**`)
    .setFooter(`Thanks For Helping Us - Zyrouge`, xtal.user.avatarURL);
    message.channel.send(embed);
    return;
  }

};

exports.help = {
  name: "useserverkey",
  aliases: []
};

exports.conf = {
  usage: "useserverkey [key]",
  description: "Active Premium using a Key.",
  category: "Configuration"
};

function tq() {
  var rand = [
    "Thank you for being the reason I smile.",
    "Saying thank you is more than good manners, it is good spirituality.",
    "Every life is a story, thank you for being part of my story.",
    "There are no words that can express my thanks for you. If words could be hugs I would send you pages.",
    "I couldn't find a card that expressed my gratitude the way I wanted. I need a card that gives you a big hug.",
    "If the world had more people like you it would be a better place. You do make a difference.",
    "You have influenced my life in such a positive way words cannot express my appreciation. You are truly an inspiration, Catherine Pulsifer",
    "From the bottom of my heart, I thank you, and appreciate all you have done. Your generosity has given me new hope! Catherine Pulsifer Hope",
    "Your guidance and patience no matter what I was doing has helped develop me into the person I am today, thank you!"
  ];
  return rand[Math.floor(Math.random()*rand.length)];
}