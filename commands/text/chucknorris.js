exports.run = async (xtal, message, args) => {
  
  const superagent = require('superagent');
  const { body } = await superagent.get('https://api.chucknorris.io/jokes/random');
  message.channel.send(body.value);
  
};

exports.help = {
  name: "chucknorris",
  aliases: []
};

exports.conf = {
  usage: "chucknorris",
  aliases: "None.",
  description: "Chucknorris Jokes.",
  category: "Text"
};