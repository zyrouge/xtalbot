const Discord = module.require('discord.js');
const ms = require('ms'); 

exports.run = (xtal, message, args) => {

   
  let Timer = args[0];

  if(!args[0]){
    return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
  }

  if(args[0] <= 0){
    return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
  }

  message.channel.send(" Timer Started for: " + `${ms(ms(Timer), {long: true})}`)

  setTimeout(function(){
    message.channel.send(message.author.toString() + `, The Timer Has Ended! It lasted for ${ms(ms(Timer), {long: true})}`)

  }, ms(Timer));

};

exports.help = {
  name: "timer",
  aliases: ['settimer']
};

exports.conf = {
  usage: "timer [time]",
  aliases: "settimer",
  description: "Sets a Reminder.",
  category: "Misc"
};