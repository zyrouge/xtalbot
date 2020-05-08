const Discord = require('discord.js');
const config = require("../../config.json")
const moment = require("moment");
require("moment-duration-format");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors) => {
  
  let prefix = await db.fetch(`guildPrefix_${message.guild.id}`);
  if(prefix == null) prefix = 'x?';
  const duration = moment.duration(xtal.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

//OS
switch(process.platform){
  case "win32": var os = "Windows"; break;
  case "linux": var os = "Linux"; break;
  case "darwin": var os = "Darwin"; break;
  case "openbsd": var os = "OpenBSD"; break;
  case "sunos": var os = "Solaris"; break;
  case "freebst": var os = "FreeBSD"; break;
};

//Game Type
var game = xtal.user.presence.game.type;
        switch(game) {
            case 1: var gtype = "Playing"; break;
            case 2: var gtype = "Listening to"; break;
            case 3: var gtype = "Watching"; break;
};

  let embed = new Discord.RichEmbed()
    .setAuthor(`${xtal.user.username} Statistics`, xtal.user.avatarURL)
    .setColor(colors.white)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .addField(`Status`, `${xtal.user.presence.status.charAt(0).toUpperCase() + xtal.user.presence.status.substring(1)} | ${gtype} **${xtal.user.presence.game.name}**`)
    .addField(`Bot Tag | ID | Prefix`, `${xtal.user.tag} | ${xtal.user.id} | ${prefix}`)
    .addField(`Info`, `Version: **${config.version}** \nTotal Commands: **${xtal.commands.size}** \nUptime: **${duration}** \nPing: **${Math.floor(xtal.ping)}ms**`)
    .addField(`Technical Information`, `OS: **${os}** \nNode Version: **${process.versions.node}** \nDiscord.js Version:**${Discord.version}** \nCPU: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** MB`)
    .addField(`Counters`, `**${xtal.users.size.toLocaleString()}** Users \n**${xtal.channels.size.toLocaleString()}** Channels \n**${xtal.guilds.size.toLocaleString()}** Servers \n **${xtal.voice.connections.size}** VCs`)
    .addField(`Bot Owner`, `${config.ownerID.map(x => xtal.users.get(x)).join(", ")} | ${config.ownerID.join(", ")}`);
  
  message.channel.send(embed);
};

exports.help = {
    name: 'botstats',
    aliases: ['botinfo','bi']
}

exports.conf = {
  usage: "botstats",
  aliases: "botinfo, bi",
  description: "Shows Xtal Information.",
  category: "Info"
};