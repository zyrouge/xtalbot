const {TeamTrees} = require('teamtrees-api');
const teamTrees = new TeamTrees();
const { RichEmbed } = require("discord.js");
exports.run = async (xtal, message, args) => {
  
  const count = await teamTrees.getTotalTrees(true);
  const left = await teamTrees.getLeft(true);
  let embed = new RichEmbed()
  .setTitle(`🌲 Teamtress`)
  .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Team_Trees_circle_logo.svg/1200px-Team_Trees_circle_logo.svg.png')
  .setURL('https://teamtrees.org/')
  .addField(`Trees Planted`, `**${count}**`, true)
  .addField(`Trees Left`, `**${left.treesLeft.amount.fixed} (${left.treesLeft.percent}%)**`, true)
  .setColor('#008000')
  .setTimestamp()
  .setFooter(xtal.user.username, xtal.user.avatarURL)
  message.channel.send({embed: embed});  
  };

exports.help = {
  name: "teamtrees",
  aliases: ['ttstats']
};

exports.conf = {
  usage: "teamtrees",
  description: "Teamtrees.org Stats.",
  category: "Misc"
};