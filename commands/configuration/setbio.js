const db = require('quick.db');

exports.run = async (xtal, message, args) => {

  let bio = args.join(" ");
  if(!bio) return xtal.cmdErr(message, 'Provide Some Text.', 'setbio');
  if(bio.length > 100) return xtal.cmdErr(message, 'Description too Long.', 'setbio');
  await db.set(`userBio_${message.author.id}`, bio);
  xtal.simpleEmbed(message, `Biography **Set!**.`);
  return;

};

exports.help = {
  name: "setbio",
  aliases: ['biography', 'setdesc']
};

exports.conf = {
  usage: "setbio [text]",
  examples: ['setbio', 'setbio Hi I am Xtal.', 'setbio I am created by ZYROUGE..'],
  description: "Sets the User Biography.",
  category: "Configuration"
};