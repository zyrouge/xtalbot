const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, message) => {

  if (message.size === 0) return;
  const sizeof = message.size;

  message.forEach(async msg => {
    if (!msg.guild) return;
    let mod = await db.fetch(`guildLogs_${msg.guild.id}`);
    if (mod == null || mod == "None.") return;

    let channel = xtal.channels.get(mod);
    if (!channel) return;
    if (msg.author.bot) return;
    if (msg.channel.type !== "text") return;

    let embed = new Discord.RichEmbed()
      .setTitle("Message Bulk Delete")
      .setThumbnail(msg.author.avatarURL)
      .setTimestamp()
      .addField(`Count`, sizeof)
      .addField(
        "Content",
        `${
          msg.cleanContent.length >= 1
            ? msg.cleanContent.substring(0, 960)
            : "-"
        }`
      )
      .addField(
        "Author",
        `${msg.author} | ${msg.author.tag} | ${msg.author.id}`
      )
      .addField(
        "Channel",
        `${msg.channel} | ${msg.channel.name} | ${msg.channel.id}`
      )
      .setColor(colors.red)
      .setFooter(xtal.user.username, xtal.user.avatarURL);

    channel.send(embed);
  });
};
