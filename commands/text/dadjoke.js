exports.run = async (xtal, message, args) => {
  
  const superagent = require('superagent');
  const { body: { joke } } = await superagent.get('https://icanhazdadjoke.com/')
	.set('Accept', 'application/json');
  message.channel.send(joke);
  
};

exports.help = {
  name: "dadjoke",
  aliases: []
};

exports.conf = {
  usage: "dadjoke",
  description: "Dad Jokes.",
  category: "Text"
};