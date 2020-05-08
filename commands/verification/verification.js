const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    let embed = new Discord.RichEmbed()
    .setAuthor(`Verification Settings`, xtal.emojiUrl(emojis.tool))
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setTimestamp()
    .setColor(colors.white);
    let verifystate = await db.fetch(`verifyState_${message.guild.id}`);
    if(verifystate == null) verifystate = false;
    let captchastate = await db.fetch(`captchaState_${message.guild.id}`);
    if(captchastate == null) captchastate = false;
    let channelstate = await db.fetch(`verifyChannel_${message.guild.id}`);
    if(channelstate == null) channelstate = undefined;
    let logsstate = await db.fetch(`verifyLogs_${message.guild.id}`);
    if(logsstate == null) logsstate = undefined;
    let rolestate = await db.fetch(`verifyRole_${message.guild.id}`);
    if(rolestate == null) rolestate = undefined;
    
    if(args[0] && args[1]) {
        if(args[0].toLowerCase() == "toggle") {
            if(args[1].toLowerCase() == "enable") {
                await db.set(`verifyState_${message.guild.id}`, true);
                embed.addField(`Verification`, `${emojis.on} Verification has been **Enabled**.`);
            } else {
                await db.set(`verifyState_${message.guild.id}`, false);
                embed.addField(`Verification`, `${emojis.off} Verification has been **Disabled**.`);
            }
        } else if(args[0].toLowerCase() == "captcha") {
            if(args[1].toLowerCase() == "enable") {
                await db.set(`captchaState_${message.guild.id}`, true);
                embed.addField(`Captcha`, `${emojis.on} Captcha has been **Enabled**.`);
            } else {
                await db.set(`captchaState_${message.guild.id}`, false);
                embed.addField(`Captcha`, `${emojis.off} Captcha has been **Disabled**.`);
            }
        } else if(args[0].toLowerCase() == "channel") {
            let argchannel;
            if(message.mentions.channels.first()) { argchannel = message.mentions.channels.first() }
            else if(args[0]) { argchannel = message.guild.channels.find('id', args[1]) || message.guild.channels.find('name', args[1]) }
            if(argchannel) {
                await db.set(`verifyChannel_${message.guild.id}`, argchannel.id);
                embed.addField(`Channel`, `${emojis.on} Channel has been set to ${argchannel}`);
            } else {
                await db.delete(`verifyChannel_${message.guild.id}`);
                embed.addField(`Channel`, `${emojis.off} Channel has been **Disabled**.`);
            }
        } else if(args[0].toLowerCase() == "logs") {
            let argchannel;
            if(message.mentions.channels.first()) { argchannel = message.mentions.channels.first() }
            else if(args[0]) { argchannel = message.guild.channels.find('id', args[1]) || message.guild.channels.find('name', args[1]) }
            if(argchannel) {
                await db.set(`verifyLogs_${message.guild.id}`, argchannel.id);
                embed.addField(`Logs`, `${emojis.on} Logs has been set to ${argchannel}`);
            } else {
                await db.delete(`verifyLogs_${message.guild.id}`);
                embed.addField(`Logs`, `${emojis.off} Logs has been **Disabled**.`);
            }
        } else if(args[0].toLowerCase() == "role") {
            let argrole;
            if(message.mentions.roles.first()) { argrole = message.mentions.roles.first() }
            else if(args[0]) { argrole = message.guild.roles.find('id', args[1]) || message.guild.roles.find('name', args[1]) }
            if(argrole) {
                await db.set(`verifyRole_${message.guild.id}`, argrole.id);
                embed.addField(`Logs`, `${emojis.on} Role has been set to ${argrole}`);
            } else {
                await db.delete(`verifyRole_${message.guild.id}`);
                embed.addField(`Role`, `${emojis.off} Role has been set to **None.**.`);
            }
        } else {
            things();
        }
    } else {
        things();
    }
    message.channel.send({ embed: embed });

    function things() {
        embed
            .addField(`Verification`, `${verifystate ? `${emojis.on} **Enabled**` : `${emojis.off} **Disabled**`}`)
            .addField(`Captcha`, `${captchastate ? `${emojis.on} **Enabled**` : `${emojis.off} **Disabled**`}`)
            .addField(`Role`, `${rolestate ? (message.guild.roles.get(rolestate) ? `${emojis.on} ${message.guild.roles.get(rolestate)}` : `${emojis.off} **Disabled**`) : `${emojis.off} **Disabled**`}`)
            .addField(`Channel`, `${channelstate ? (message.guild.channels.get(channelstate) ? `${emojis.on} ${message.guild.channels.get(channelstate)}` : `${emojis.off} **Disabled**`) : `${emojis.off} **Disabled**`}`)
            .addField(`Logs`, `${logsstate ? (message.guild.channels.get(logsstate) ? `${emojis.on} ${message.guild.channels.get(logsstate)}` : `${emojis.off} **Disabled**`) : `${emojis.off} **Disabled**`}`);
    }
  
};

exports.help = {
  name: "verification",
  aliases: []
};

exports.conf = {
  usage: "verification <toggle/captcha/channel/logs/role> <enable/disable/#channel>",
  description: "Enable/Disable Verification.",
  category: "Verification"
};