const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {

    let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = xtal.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason
        };

        xtal.afk.set(message.author.id, construct);
        let embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`AFK Set!`)
        .setDescription(`Reason: **${reason}**`)
        .setTimestamp()
        .setColor(colors.white)
        .setFooter(xtal.user.username, xtal.user.avatarURL);
        return message.reply(embed);
    }

};

exports.help = {
  name: "afk",
  aliases: ["awayfromkeyboard"]
};

exports.conf = {
    usage: "afk [status]",
    aliases: "awayfromkeyboard",
    description: "Set an AFK Message.",
    category: "Utility"
};