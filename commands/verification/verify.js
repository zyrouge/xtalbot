const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

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

    if(!verifychannel || !role) return;
    if(message.channel.id === verifychannel.id) {
        message.delete();
        if(captchastate) {
            if(message.member.roles.has(role.id)) {
                message.reply(`Already **Verified!**`).then(del => del.delete(10000));
                log(`Tried but Already Verified.`);
            } else {
                try {
                    const { createCanvas, loadImage } = require('canvas');
                    const canvas = createCanvas(150, 50);
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = "#40e0d0";
                    var key = "";
                    for (var i = 0; i < 6; i++) {
                        var rnd = Math.random();
                        if (Math.round(rnd) == 0) {
                            key += String.fromCharCode(48 + 9 * Math.random());
                        } else {
                            key += String.fromCharCode(65 + 25 * Math.random());
                        }
                    }
                    ctx.clearRect(0, 0, 150, 50);
                    ctx.fillRect(0, 0, 150, 50);
                    ctx.font = "30px calibri";
                    ctx.strokeText(key, 24, 34);
                    const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png');
                    log(`Captcha Created with Code: **${key}**`);
                    try {
                    const filter = response => {
                        response.delete();
                        return response.content == key && response.author.id === message.author.id;
                    };
                    await message.channel.send(`${message.author}, You got **60** Seconds to Solve this.`, attachment).then((msg) => {
                        message.channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] })
                            .then(collected => {
                                message.channel.send(`${collected.first().author}, ${emojis.verified} | **Captcha Verification Success**!`);
                                if(role && role.position >= message.guild.me.highestRole.position) {
                                    xtal.cmdErr(message, `Can\'t Manage the Verification Role [${role}]`, this.help.name);
                                    log(`Can\'t Manage the Verification Role [${role}]`);
                                    msg.delete();
                                    return;
                                }
                                message.member.addRole(role).catch((e) => { return log(`Can\'t Add Role!`)});
                                log(`Verified with Code: **${key}**`);
                                msg.delete();
                            })
                            .catch(collected => {
                                msg.delete();
                                log(`**Captcha Verification Failed.**\nCode: **${key}**`);
                                return message.reply('**Captcha Verification Failed.**').then(del => del.delete(10000));
                            });
                    });
                } catch(e) {
                    log(`**Verification Failed!**\nError: **${e}**`)
                    message.reply(`**Verification Failed!**\nError: \`\` ${e} \`\``).then(del => del.delete(10000));
                }
                } catch(e) {
                    log(`**Verification Failed!**\nError: **${e}**`)
                    message.reply(`**Captcha Failed!**\nError: \`\` ${e} \`\``).then(del => del.delete(10000));
                    log(e);
                }
            }
        } else {
            if(message.member.roles.has(role)) {
                message.reply(`Already **Verified!**`).then(del => del.delete(10000));
                log(`Tried but Already Verified.`);
            } else {
                if(role && role.position >= message.guild.me.highestRole.position) return xtal.cmdErr(message, `Can\'t Manage the Verification Role [${role}]`, this.help.name);
                message.member.addRole(role);
                log(`**Verified Successfully.**`);
                message.reply(`${emojis.verified} | **Verification Success!**`).then(del => del.delete(10000));
            }
        }
    } else return;

    /* Functions */

    function log(text) {
        if(!logschannel) return;
        let logembed = new Discord.RichEmbed()
        .setAuthor(`Verification Log`)
        .setDescription(text)
        .addField(`Info`, `User: ${message.author} | **${message.author.tag}** | **${message.author.id}**`)
        .setFooter(xtal.user.username, xtal.user.avatarURL)
        .setTimestamp()
        .setColor(colors.white);
        logschannel.send({embed: logembed});
    }
  
};

exports.help = {
  name: "verify",
  aliases: []
};

exports.conf = {
  usage: "verify",
  description: "Use to Verify.",
  category: "Verification"
};