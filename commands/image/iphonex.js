const superagent = require('superagent');

exports.run = async (xtal, message, args) => {
  
    let user = message.mentions.members.first() || message.member;
    let av = user.user.displayAvatarURL;

      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'iphonex', url: `${av}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
  
};

exports.help = {
  name: "iphonex",
  aliases: []
};

exports.conf = {
  usage: "iphonex @user",
  aliases: "None.",
  description: "iPhoneX Command.",
  category: "Image"
};