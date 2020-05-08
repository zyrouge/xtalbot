exports.run = async (xtal, message, args) => {

  const eco = require("discord-economy");
 
  var flip = args[0]
  var amount = args[1]
 
    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Pls specify the flip, either heads or tails!')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have less coins than the amount you want to gamble!')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  };

exports.help = {
  name: "coinflip",
  aliases: ['cflip']
};

exports.conf = {
  usage: "coinflip [heads/tails] [amount]",
  aliases: "cflip",
  description: "Flip your Coin and Gamble.",
  category: "Economy"
};