const db = require('quick.db');
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
    
    
const resp = await db.startsWith(`guildReps_${message.guild.id}`, { sort: '.data'});
resp.length = 10;
let finalOutput = ' ';
for (var i in resp) {
    finalOutput += `**${xtal.users.get(resp[i].ID.split("_")[2]).tag}** - ${resp[i].data} \n`;
}

let embed = new RichEmbed()
    .setAuthor(`Reps Leaderboard`, message.guild.iconURL)
    .setTimestamp()
    .setDescription(finalOutput)
    .setColor(colors.cyan)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send({embed});

};

exports.help = {
    name: "repboard",
    aliases: ["replb"]
  }
  
  exports.conf = {
    usage: "repboard",
    aliases: "replb",
    description: "Shows the Rep Leaderboard.",
    category: "Utility"
  };