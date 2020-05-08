exports.run = async (xtal, message, args) => {
  const superagent = require('superagent');
  
    const m = await message.channel.send('Generating Image...');
    let user = message.mentions.members.first() || message.member;
    let av = user.user.avatarURL;
    let username = user.user.username;

      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'captcha', url: `${av}`, username: `${username}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
      m.delete(10000);
  
};

exports.help = {
  name: "captcha",
  aliases: []
};

exports.conf = {
  usage: "captcha @user",
  aliases: "None.",
  description: "Captchaify a Users Avatar.",
  category: "Image"
};