exports.run = async (xtal, message, args, colors) => {
  
  const gkey = `globalPoints-${message.author.id}`;
  const filtered = xtal.glevels.array();
  const sorted = filtered.sort((a, b) => b.points - a.points);
  const top10 = sorted.splice(0, 10);

  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor("Global Leaderboard", message.guild.iconURL)
    .setAuthor(xtal.user.username, xtal.user.avatarURL)
    .setDescription("Our Top 10 Global Leaders!")
    .setColor(colors.white)
    .setTimestamp();

  for (const data of top10) {
    embed.addField(xtal.users.get(data.user).tag, `**${data.points}** XP (Level **${data.level}**)`);
  }
  let pos;
  const newfilter = xtal.glevels.array().sort((a, b) => b.points - a.points);
  for(let i = 0; i < newfilter.length; i++) {
    if(newfilter[i].user == `${message.author.id}`) {
      pos = i + 1;
    }
  }
  if(pos > 10) {
    embed.addBlankField();
    embed.addField(`You are in ${pos}th Position`, `**${xtal.glevels.get(gkey, "points")}** XP (Level **${xtal.glevels.get(gkey, "level")}**)`);
  }
  embed.setFooter(xtal.user.username, xtal.user.avatarURL);
  return message.channel.send({embed});
  
  };

exports.help = {
  name: "gleaderboard",
  aliases: ['glb', 'glevelboard', 'gpointsboard']
};

exports.conf = {
  usage: "gleaderboard",
  description: "Sends the Global Points Table.",
  category: "Leveling"
};