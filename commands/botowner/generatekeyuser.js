const generateKey = require('../../util/generateKey.js');

exports.run = async (xtal, message, args, colors, emojis) => {
  
    if(message.channel.type !== "dm") return xtal.cmdErr(message, 'DM Only Command', this.help.name);
    xtal.xtalPremium.ensure('userKeys', []);
    const keygot = xtal.xtalPremium.get('userKeys');
    const key = await generateKey();
    keygot.push(key);
    xtal.xtalPremium.set('userKeys', keygot);
    xtal.simpleEmbed(message, `User Key: **${key}**`);
  
};

exports.help = {
  name: "generatekeyuser",
  aliases: ['genuser']
};

exports.conf = {
  usage: "generatekeyuser",
  description: "Generates User Key",
  category: "BotOwner"
};