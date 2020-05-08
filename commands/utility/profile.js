const Discord = require("discord.js");
const path = require('path');
const Canvas = require("canvas");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors) => {
  let user;
  if (message.mentions.members.first()) user = message.mentions.members.first();
  else if (args[0]) user = message.guild.members.find("name", args[0]) || message.guild.members.find("id", args[0]);
  else user = message.member;
  
  /* Font */
  Canvas.registerFont(path.join(__dirname, '../../fonts', "Uni Sans Heavy.otf"), { family: "Uni Sans" });

  let canvas = Canvas.createCanvas(644, 600);
  let ctx = canvas.getContext("2d");
  const card = "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fxtal%20card.png?v=1575301657971";
  const background = await Canvas.loadImage(card);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  /* Name */
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "start";
  const name = user.user.username.length > 10 ? user.user.username.substring(0, 10).trim() + "..." : user.user.username;
  ctx.fillText(`${name}`, 85, 98);
  
  /* Discrim */
  ctx.font = "italic 30px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.textAlign = "end";
  const discrim = '#' + user.user.discriminator;
  ctx.fillText(`${discrim}`, 370, 98);
  
  /* Bio */
  let biog = await db.fetch(`userBio_${user.user.id}`);
  if(biog == null) biog = 'This User kept his Profile Mysterious!';
  let bio = '';
  biog.split(" ").forEach(word => {
    const clone = bio;
    const length = clone.split("\n").pop().length;
    if(length + 1 + word.length > 50) bio += `\n${word}`;
    else bio += ` ${word}`;
  });
  ctx.font = "18px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.textAlign = "start";
  ctx.fillText('Description:', 75, 178);
  ctx.font = "18px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "start";
  ctx.fillText(`${bio}`, 75 - ctx.measureText(' ').width, 200);
  
  /* XP Text */
  const key = `globalPoints-${user.user.id}`;
  xtal.glevels.ensure(key, {
      user: user.user.id,
      points: 0,
      level: 1,
  });
  let score = xtal.glevels.get(key);
  let pos = 0;
  const filtered = xtal.glevels.array();
  const sorted = filtered.sort((a, b) => a.points < b.points);
  for(let i = 0; i < sorted.length; i++) {
    if(sorted[i].user == user.user.id) pos = i + 1;
  }
  const l = score.level;
  const p = score.points;
  const neededp = Math.pow((l / 0.1), 2);
  const nextl = l + 1;
  const nextp = Math.pow((nextl / 0.1), 2);
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.textAlign = "start";
  ctx.fillText("/ " + neededp, 400 + ctx.measureText(p).width + 10, 490);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(p, 400, 490);
  ctx.textAlign = "end";
  ctx.font = "30px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText(`XP: `, 400, 490);
  
  /* XP Bar */
  const startV = 48;
  const endV = 300;
  const downV = 52.9;
  const downVd = 5209 + 0.25;
  let widthXP = map(p, 0, nextp, 0, endV);
  if (widthXP > 513 - 18.5) widthXP = 513 - 18.5;

  ctx.beginPath();
  ctx.fillStyle = "#424751";
  ctx.arc(49 + 18.5, 490.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();
  ctx.fillRect(49 + 18.5, 490.5 + 36.25, 513 - 18.5, 37.5);
  ctx.arc(49 + 513, 490.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.arc(49 + 18.5, 490.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();
  ctx.fillRect(49 + 18.5, 490.5 + 36.25, widthXP, 37.5);
  ctx.arc(49 + 18.5 + widthXP, 490.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
  ctx.fill();
  
  /* Rank */
  ctx.font = "30px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText('#', 90, 490);
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.fillText(`${pos}`, 90 + ctx.measureText('#').width, 490);
  
  /* Level */
  ctx.font = "30px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText('Level:', 90 + ctx.measureText(`# ${pos} `).width, 490);
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.fillText(`${l}`, 90 + ctx.measureText(`# ${pos} Level: `).width, 490);
  
  /* Line Space */
  let space = 322;
  
  /* Economy */
  let balance = await xtal.eco.fetch(`eco_${user.user.id}`);
  if(balance == null) balance = 0;
  let bankbalance = await xtal.eco.fetch(`bank_${user.user.id}`);
  if(bankbalance == null) bankbalance = 0;
  ctx.font = "25px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText('Wallet:', 78, space);
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.fillText(`${balance}`, 78 + ctx.measureText(`Wallet: `).width, space);
  ctx.font = "25px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText('Bank:', 78, space += 30);
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.fillText(`${bankbalance}`, 78 + ctx.measureText(`Bank: `).width, space);
  
  /* Cmds Ran */
  xtal.cmdsRan.ensure(`cmdsRan_${user.user.id}`, 0);
  const ran = xtal.cmdsRan.get(`cmdsRan_${user.user.id}`);
  ctx.font = "25px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText('Cmds Ran:', 78, space += 30);
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.fillText(`${ran}`, 78 + ctx.measureText(`Cmds Ran: `).width, space);
  
  /* Reps */
  let reps = await db.fetch(`guildReps_${message.guild.id}_${user.user.id}`);
  if(reps == null) reps = 0;
  ctx.font = "25px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText('Reps:', 78, space += 30);
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.fillText(`${reps}`, 78 + ctx.measureText(`Reps: `).width, space);
  
  /* Normie or Premium */
  xtal.xtalPremium.ensure('userPremium', []);
  let premium = false;
  if(xtal.xtalPremium.get('userPremium').includes(user.user.id)) premium = true;
  const premiumText = premium ? "Special" : "Normie";
  ctx.font = "bold italic 40px Arial";
  ctx.textAlign = "start";
  ctx.beginPath();
  ctx.fillStyle = `#ffffff`;
  ctx.fillRect(380, 340, ctx.measureText(` ${premiumText} `).width, 50);
  ctx.fill();
  ctx.fillStyle = "#23272A";
  ctx.fillText(` ${premiumText} `, 380, 380);
  
  /* Avatar */
  var colorStatus = "#44b37f";
  if (user.presence.status === 'idle') colorStatus = "#faa61a";
  if (user.presence.status === 'offline') colorStatus = "#747f8d";
  if (user.presence.status === 'dnd') colorStatus = "#f04747";
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.arc(420 + 60.5, 49 + 60.5, 60.5, 0, 2 * Math.PI, false);
  ctx.strokeStyle = colorStatus;
  ctx.stroke();
  ctx.clip();
  const avatar = await Canvas.loadImage(user.user.displayAvatarURL);
  ctx.drawImage(avatar, 420, 49, 121, 121);
  
  message.channel.send({
    files: [canvas.toBuffer()]
  });
};

exports.help = {
  name: "profile",
  aliases: ["me"]
};

exports.conf = {
  usage: "profile <@user>",
  description: "Shows your Profile Card.",
  category: "Utility"
};

function map(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}