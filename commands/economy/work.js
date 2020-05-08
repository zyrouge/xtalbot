exports.run = async (xtal, message, args) => {

  const eco = require("discord-economy");
  
   var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ['Cashier', 'Shopkeeper','Developer','Teacher']
    })
    if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!')
 
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`)
  
  };

exports.help = {
  name: "work",
  aliases: []
};

exports.conf = {
  usage: "work",
  aliases: "None.",
  description: "Work to Earn Cash.",
  category: "Economy",
  cooldown: 600
};