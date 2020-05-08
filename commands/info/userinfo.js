const Discord = require("discord.js");


exports.run = async (xtal, message, args, colors, emojis) => {

  let user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

  if (user.user.bot) { var bot = emojis.bot }
  if (!user.user.bot) { var bot = emojis.discord }

  if(user.presence.game) {
  var gamet = user.presence.game.type;
        switch(gamet) {
            case 0: var gtype = "Playing"; break;
            case 1: var gtype = "Streaming"; break;
            case 2: var gtype = "Listening to"; break;
            case 3: var gtype = "Watching"; break;
            case 4: var gtype = "Playing"; break;
  };

  var game = user.presence.game.name;
} else {
  var gtype = 'None.';
  var game = '';
}

  let status;
  var statusc = user.presence.status;
  switch(statusc) {
    case "online": status = emojis.online; break;
    case "idle": status = emojis.idle; break;
    case "dnd": status = emojis.dnd; break;
    case "offline": status = emojis.offline; break;
};

  let embed = new Discord.RichEmbed()
  .setThumbnail(user.user.displayAvatarURL)
  .setColor(user.displayHexColor)
  .addField("Full Username", `${user.user.tag} | ${bot}`, true)
  .addField("ID", user.id, true)
  .addField("Nickname", `${user.nickname !== null ? `${user.nickname}` : "None"}`, true)
  .addField("Joined this Server On", user.joinedAt + ` (` +Days(user.joinedAt) +`)`, false)
  .addField("Joined Discord On", user.user.createdAt + ` (` +Days(user.user.createdAt) +`)`, false)
  .addField("Status", `${status} | ${gtype ? gtype : "None."} ${game}${user.presence.url ? ` | ${user.presence.url}` : ''}`, false)
  .addField("Roles", `${user.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&`+roles.id+`>`).join(" **|** ") || "No Roles"}`, false)
  .setFooter(xtal.user.username, xtal.user.avatarURL)
  .setTimestamp()

message.channel.send(embed);

};

exports.help = {
  name: "userinfo",
  aliases: ['ui', 'whois']
};

exports.conf = {
  usage: "userinfo @user",
  aliases: "ui, whois",
  description: "User Information.",
  category: "Info"
};

function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};