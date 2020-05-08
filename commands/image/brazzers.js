const Discord = require("discord.js");
const Canvas = require("canvas");

exports.run = async (xtal, message, args, colors) => {
  let user;
  if (message.mentions.members.first()) user = message.mentions.members.first();
  else if (args[0]) user = message.guild.members.find("name", args[0]) || message.guild.members.find("id", args[0]);
  else user = message.member;

  const SIZE = 500;
  let canvas = Canvas.createCanvas(SIZE, SIZE);
  let ctx = canvas.getContext("2d");
  const avatar = await Canvas.loadImage(user.user.displayAvatarURL);
	ctx.drawImage(avatar, 0, 0, SIZE, SIZE);
  const brazzer = await Canvas.loadImage("https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbrazzers.png?v=1576425897786");
  ctx.drawImage(brazzer, canvas.width - 266 - 7, canvas.height - 60 - 7, 266, 60);
  
  message.channel.send({
    files: [canvas.toBuffer()]
  });
};

exports.help = {
  name: "brazzers",
  aliases: ["brazzer"]
};

exports.conf = {
  usage: "brazzer <@user>",
  description: "Sends your Avatar with Brazzers Footer.",
  category: "Image"
};