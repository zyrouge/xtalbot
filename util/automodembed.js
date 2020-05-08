const db = require("quick.db");
const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports = async (message, reason, xtal) => {
        if(!message.guild) return;
        let mod = await db.fetch(`guildLogs_${message.guild.id}`);
        if(mod == null || mod == 'None.') return;
        else {
        let channel = xtal.channels.get(mod);
        if(channel) {
        let embed = new Discord.RichEmbed()
        .setTitle(`Action: AutoMod`)
        .setTimestamp()
        .addField('Reason', `${reason}`)
        .addField('Content', `${message.content ? message.content : 'None.'}`)
        .addField('User', `${message.author.tag} | ${message.author.id}`)
        .addField('Channel', `${message.channel.name} | ${message.channel.id}`)
        .setColor(colors.red)
        .setThumbnail(message.author.avatarURL)
        .setFooter(xtal.user.username, xtal.user.avatarURL);
        channel.send(embed)
        }};
}