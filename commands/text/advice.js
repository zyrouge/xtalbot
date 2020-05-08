exports.run = async (xtal, message, args) => {
  
  const superagent = require('superagent');
  const res = await superagent.get('http://api.adviceslip.com/advice');
  const { slip: { advice } } = JSON.parse(res.text);
  message.channel.send(advice);
  
};

exports.help = {
  name: "advice",
  aliases: []
};

exports.conf = {
  usage: "advice @user",
  aliases: "None.",
  description: "Advices a User.",
  category: "Text"
};