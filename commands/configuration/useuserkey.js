const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emoji) => {

  if(message.channel.type !== "dm") return xtal.cmdErr(message, 'DM Only Command', this.help.name);
  xtal.xtalPremium.ensure('userPremium', []);
  xtal.xtalPremium.ensure('userKeys', []);
  xtal.xtalPremium.ensure('userKeysUsed', []);
  const key = args.join(" ");
  const user = message.author.id;
  const premiumusers = xtal.xtalPremium.get('userPremium');
  const premiumkeys = xtal.xtalPremium.get('userKeys');
  const usedkeys = xtal.xtalPremium.get('userKeysUsed');
  if(premiumusers.includes(user)) return xtal.simpleEmbed(message, 'You already have **Premium Access**');
  if(!premiumkeys.includes(key)) return xtal.simpleEmbed(message, '**Invalid Key.**');
  if(premiumkeys.includes(key)) {
    premiumusers.push(user);
    usedkeys.push({key: key, auth: user, date: new Date().toUTCString()});
    premiumkeys.splice(key, 1);
    xtal.xtalPremium.set('userPremium', premiumusers);
    xtal.xtalPremium.set('userKeys', premiumkeys);
    xtal.xtalPremium.set('userKeysUsed', usedkeys);
    const embed = new RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(colors.gold)
    .addField(`${emoji.verified} Successfully Activated your Premium Services!`,`**${tq()}**`)
    .setFooter(`Thanks For Helping Us - Zyrouge`, xtal.user.avatarURL);
    message.channel.send(embed);
    return;
  }

};

exports.help = {
  name: "useuserkey",
  aliases: []
};

exports.conf = {
  usage: "useuserkey [key]",
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