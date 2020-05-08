const generateKey = require('../../util/generateKey.js');

exports.run = async (xtal, message, args, colors, emojis) => {
  
  if(message.channel.type !== "dm") return xtal.cmdErr(message, 'DM Only Command', this.help.name);
  xtal.xtalPremium.ensure('serverKeys', []);
  const keygot = xtal.xtalPremium.get('serverKeys');
  const key = await generateKey();
  keygot.push(key);
  xtal.xtalPremium.set('serverKeys', keygot);
  xtal.simpleEmbed(message, `Server Key: **${key}**`);
  
};

exports.help = {
  name: "generatekeyserver",
  aliases: ['genserver']
};

exports.conf = {
  usage: "generatekeyserver",
  description: "Generates Server Key",
  category: "BotOwner"
};