const superagent = require('superagent');

exports.run = async (xtal, message, args) => {
  
    let user = message.mentions.members.first() || message.member;
    let av = user.user.displayAvatarURL;

      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'lolice', url: `${av}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
  
};

exports.help = {
  name: "lolice",
  aliases: ['loli']
};

exports.conf = {
  usage: "lolice @user",
  aliases: "loli",
  description: "Lolice Command.",
  category: "Image"
};