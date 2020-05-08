const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  // const robamt = random.int(min = -500, max = 500);
  // console.log(robamt)

};

exports.help = {
  name: "rob",
  aliases: ['steal']
};

exports.conf = {
  usage: "rob @user",
  aliases: "steal",
  description: "Rob a User.",
  category: "Economy"
};