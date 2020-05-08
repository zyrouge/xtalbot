const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {

  let user;
  if(message.mentions.members.first()) user = message.mentions.members.first()
  else if(args[0]) user = message.guild.members.find('name', args[0]) || message.guild.members.find('id', args[0]);
  else user = message.member;
  const key = `${message.guild.id}-${user.user.id}`;
  xtal.levels.ensure(key, {
      user: user.user.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
  });
  let score = xtal.levels.get(key);
  
  const Canvas = require('canvas');
  let canvas = Canvas.createCanvas(934, 282);
  let ctx = canvas.getContext('2d');
  const card = 'https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2FrankCrad.png?v=1574609595891';
  const background = await Canvas.loadImage(card);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  let opacity = 1;
  var colorStatus = "#44b37f";
  if (user.presence.status === 'idle') colorStatus = "#faa61a";
  if (user.presence.status === 'offline') colorStatus = "#747f8d";
  if (user.presence.status === 'dnd') colorStatus = "#f04747";
  let pos = 0;
  const filtered = xtal.levels.array().filter(p => p.guild === message.guild.id);
  const sorted = filtered.sort((a, b) => b.points - a.points);
  for(let i = 0; i < sorted.length; i++) {
    if(sorted[i].user == user.user.id) pos = i + 1;
  }
  const l = score.level;
  const p = score.points;
  const neededp = Math.pow((l / 0.1), 2);
  const nextl = l + 1;
  const nextp = Math.pow((nextl / 0.1), 2);
  let widthXP = map(p, 0, nextp, 0, 615);

  ctx.globalAlpha = opacity;
  ctx.font = "36px Arial";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "start";
          const name = user.user.username.length > 7 ? user.user.username.substring(0, 7).trim() + '...' : user.user.username;
          ctx.fillText(`${name}`, 264, 164);
          ctx.font = "italic 36px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.textAlign = "center";
          ctx.fillText(`#${user.user.discriminator}`, ctx.measureText(name).width + 10 + 316, 164);
          /*LEVEL*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = "end";
          ctx.fillText(l, 934 - 64, 82);
          ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(l).width - 16, 82);
          /*RANK*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "end";
          ctx.fillText(pos, 934 - 64 - ctx.measureText(l).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82);
          ctx.fillText("RANK", 934 - 64 - ctx.measureText(l).width - 16 - ctx.measureText(`LEVEL`).width - 16 - ctx.measureText(pos).width - 16, 82);
          /*XPS*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.textAlign = "start";
          ctx.fillText("/ " + neededp, 624 + ctx.measureText(p).width + 10, 164);
          ctx.fillStyle = "#ffffff";
          ctx.fillText(p, 624, 164);

          if (widthXP > 615 - 18.5) widthXP = 615 - 18.5;

          ctx.beginPath();
          ctx.fillStyle = "#424751";
          ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
          ctx.fill();
          ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
          ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
          ctx.fill();
          ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
          ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
          ctx.fill();

          ctx.beginPath();
          ctx.lineWidth = 8;
          ctx.arc(85 + 75, 66 + 75, 75, 0, 2 * Math.PI, false);
          ctx.strokeStyle = colorStatus;
          ctx.stroke();
          ctx.clip();
          const avatar = await Canvas.loadImage(user.user.displayAvatarURL);
          ctx.drawImage(avatar, 85, 66, 150, 150);
  
  message.channel.send({
            files: [
              canvas.toBuffer()
            ]
          });
  
  };

exports.help = {
  name: "rank",
  aliases: ['level', 'points']
};

exports.conf = {
  usage: "rank @user",
  description: "Shows the User Points.",
  category: "Leveling"
};

function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }