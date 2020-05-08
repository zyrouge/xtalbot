exports.run = async (xtal, message, args, colors) => {
  
  const filtered = xtal.levels.array().filter( p => p.guild === message.guild.id );
  const sorted = filtered.sort((a, b) => b.points - a.points);
  const top10 = sorted.splice(0, 10);

  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .setAuthor("Leaderboard", message.guild.iconURL)
    .setAuthor(xtal.user.username, xtal.user.avatarURL)
    .setDescription("Our Top 10 points leaders!")
    .setColor(colors.white)
    .setTimestamp();

  for (const data of top10) {
    embed.addField(xtal.users.get(data.user).tag, `**${data.points}** XP (Level **${data.level}**)`);
  }
  return message.channel.send({embed});
  
  };

exports.help = {
  name: "leaderboard",
  aliases: ['lb', 'levelboard', 'pointsboard']
};

exports.conf = {
  usage: "leaderboard",
  aliases: "lb, levelboard, pointsboard",
  description: "Sends the Points Table.",
  category: "Leveling"
};