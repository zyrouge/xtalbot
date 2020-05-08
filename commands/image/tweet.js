const superagent = require('superagent');

exports.run = async (xtal, message, args) => {
  
    let username = args.shift();
    let txt = args.join(" ");

    if(!txt) return message.channel.send(`Incorrect Usage.`);
    if(message.mentions.members.first()) username = message.mentions.members.first().user.username;
    
      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'tweet', username: `${username}`, text: `${txt}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
  
};

exports.help = {
  name: "tweet",
  aliases: []
};

exports.conf = {
  usage: "tweet [text]",
  aliases: "None.",
  description: "Tweet Command.",
  category: "Image"
};