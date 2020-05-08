const superagent = require('superagent');

exports.run = async (xtal, message, args) => {
  
    const m = await message.channel.send('Generating Image...');
    let user = message.mentions.members.first() || message.member;
    let av = user.user.displayAvatarURL;

      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'magik', image: `${av}`, intensity: `5`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
      m.delete(5000);
  
};

exports.help = {
  name: "magik",
  aliases: []
};

exports.conf = {
  usage: "magik @user",
  aliases: "None.",
  description: "Magik a Users Avatar.",
  category: "Image"
};