exports.run = async (xtal, message, args) => {
  const superagent = require('superagent');
  
    const m = await message.channel.send('Generating Image...');
    let user = message.mentions.members.first() || message.member;
    let av = user.user.displayAvatarURL;

      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'blurpify', image: `${av}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
      m.delete(10000);
  
};

exports.help = {
  name: "blurpify",
  aliases: []
};

exports.conf = {
  usage: "blurpify @user",
  aliases: "None.",
  description: "Blurpify a Users Avatar.",
  category: "Image"
};