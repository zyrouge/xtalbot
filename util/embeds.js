const Discord = require("discord.js");
const fs = require("fs");
let colors = require("../colors.json");
const db = require("quick.db");

module.exports = (xtal) => {

    xtal.noPerms = async (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setDescription(`You don\'t have Enough Permissions.\n**Missing Permissions:** ${perm}`)
        .setColor(colors.red)
    message.channel.send(embed);
}

    xtal.xnoPerms = async (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setDescription(`I don\'t have Enough Permissions.\n**Missing Permissions:** ${perm}`)
    message.channel.send(embed);
}

    xtal.eqPerms = async (message, perms, user) => {
    let embed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setDescription(`${user} is a Mod/Admin.\n**Permissions:** ${perms}`);
    message.channel.send(embed);
}

    xtal.cmdErr = async (message, erro, cmd) => {
        cmd = xtal.commands.get(cmd) || xtal.commands.get(xtal.aliases.get(cmd))
        let usage = cmd.conf.usage;
        let embed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setDescription(`**Error:** ` + erro)
        .setFooter(xtal.prefix + usage);
    message.channel.send(embed);
}

    xtal.simpleEmbed = async (message, description) => {
        let embed = new Discord.RichEmbed()
        .setAuthor(xtal.user.username, xtal.user.avatarURL)
        .setDescription(description)
        .setColor(colors.white);
    message.channel.send(embed);
}

};