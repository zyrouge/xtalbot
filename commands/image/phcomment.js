const superagent = require('superagent');

exports.run = async (xtal, message, args) => {
  
    let user = message.mentions.members.first() || message.member;
    let av = user.user.displayAvatarURL;
    let us = user.user.username;
    let text;
    if(message.mentions.members.first()) text = args.join(" ").slice(22)
    else text = args.join(" ");
    if(!text) text = ph();

      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'phcomment', image: `${av}`, text: `${text}`, username: `${us}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
  
};

exports.help = {
  name: "phcomment",
  aliases: ['phc']
};

exports.conf = {
  usage: "phcomment @user [text] **or** phcomment [text]",
  aliases: "None.",
  description: "PornHub Comment.",
  category: "Image"
};

function ph() {
    var rand = ['Guys I’m bisexual and this is making me horny','I can Fuck better than this, Wanna try?'];
    return rand[Math.floor(Math.random()*rand.length)];
}