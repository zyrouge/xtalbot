const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

    let embed = new Discord.RichEmbed()
    .setAuthor(`Verification Settings`, xtal.emojiUrl(emojis.tool))
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setTimestamp()
    .setColor(colors.white);
    let errs = [];
    let warns = []
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
    
    const verifychannel = channelstate ? message.guild.channels.get(channelstate) : undefined;
    const logschannel = logsstate ? message.guild.channels.get(logsstate) : undefined;
    const role = rolestate ? message.guild.roles.get(rolestate) : undefined;

    if(!verifystate) errs.push(`**Verification** has not been Enabled!`);
    if(!verifychannel) errs.push(`**Verification Channel** has not been Set!`);
    if(!role) errs.push(`**Verification Role** has not been Set!`);
    if(!captchastate) warns.push(`**Captcha** isn\'t Enabled!`);
    if(!logschannel) warns.push(`**Logs Channel** has not been Set!`);
    
    let done, adds;
    if(errs.length > 0) {
        embed.addField(`Unfinished Tasks`, `${errs.map((x, i) => `${++i} - ${x}`).join("\n")}`);
        done = true;
    }
    if(warns.length > 0) {
        embed.addField(`Recommended Tasks`, `${warns.map((x, i) => `${++i} - ${x}`).join("\n")}`);
        adds = true;
    }

    embed.addField(`State`, `${done ? "**Incomplete.**" : "**Working.**"}${adds ? " (Some Recommended Features can be Added)": ""}`);
    message.channel.send({embed: embed})

};

exports.help = {
  name: "checkverify",
  aliases: ['checkverification']
};

exports.conf = {
  usage: "checkverify",
  description: "Check Verification State.",
  category: "Verification"
};