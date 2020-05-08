const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

const resp = await xtal.eco.startsWith(`eco_`, { sort: '.data'});
if(args[0] && (args[0].toLowerCase () === "global" || args[0].toLowerCase() === "g")) resp.filter(r => xtal.users.get(r.ID.split("_")[1]) !== undefined);
else resp.filter(r => message.guild.members.get(r.ID.split("_")[1]));
resp.length = 10;
let x = 0;
let finalOutput = ' ';
for (var i in resp) {
  if((args[0] && (args[0].toLowerCase() === "global" || args[0].toLowerCase () === "g")) ? xtal.users.get(resp[i].ID.split("_")[1]) : message.guild.members.get(resp[i].ID.split("_")[1]))
    finalOutput += `${++x} - **${xtal.users.get(resp[i].ID.split("_")[1]).tag}** - __${resp[i].data}__ \n`;
}

let embed = new RichEmbed()
    .setAuthor(`Crystal Leaderboard`, `https://cdn.discordapp.com/emojis/` + emojis.crystalsid)
    .setTimestamp()
    .setDescription(finalOutput)
    .setColor(colors.cyan)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    message.channel.send({embed});

};

exports.help = {
  name: "ecoleaderboard",
  aliases: ['ecolb']
};

exports.conf = {
  usage: "ecoleaderboard",
  aliases: "ecolb",
  description: "Sends the Economy Leaderboard.",
  category: "Economy"
};