const Discord = require("discord.js");


exports.run = async (xtal, message, args, colors, emojis) => {

  let channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel;

  let embed = new Discord.RichEmbed()
  .setThumbnail(message.guild.iconURL)
  .setColor(colors.orange)
  .addField("Name", `${channel.name} [${channel.type == "text" ? "Text" : "Voice"}]`, true)
  .addField("ID", channel.id, true)
  .addField("Topic", `${(channel.topic !== null && channel.topic.length !== 0) ? channel.topic : "Not Set."}`, true)
  .addField("Creation Date", channel.createdAt.toUTCString() + ` (` +Days(channel.createdAt) +`)`, false)
  .addField("Members", `${channel.members.size}`, false)
  .setFooter(xtal.user.username, xtal.user.avatarURL)
  .setTimestamp()

message.channel.send(embed);

};

exports.help = {
  name: "channelinfo",
  aliases: ['ci']
};

exports.conf = {
  usage: "userinfo @user",
  description: "Channel Information.",
  category: "Info"
};

function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};