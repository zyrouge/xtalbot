const { RichEmbed } = require("discord.js");
const wait = require('util').promisify(setTimeout);

exports.run = async (xtal, message, args, colors) => {
 
    if(!message.member.hasPermission("ADMINISTRATOR")) return xtal.noPerms(message, "ADMINISTRATOR");
    let name = args.join(" ");
    if(!name) return xtal.cmdErr(message, 'Provide a Nickname', 'massnick');
    if(name == 'reset') name = ``;
    message.channel.send(`Changing Nicknames. This may take a while.`);
    message.guild.members.forEach(m => {
    setTimeout(() => {
        if (m.highestRole.position >= message.member.highestRole.position) return;
        if (m.highestRole.position >= message.guild.me.highestRole.position) return;
        m.setNickname(`${name}`);
    }, 5000)
    });
    message.channel.send(`Mass Nicknames Done.`);

};

exports.help = {
  name: "massnick",
  aliases: []
};

exports.conf = {
  usage: "massnick [nickname/reset]",
  aliases: "None.",
  description: "Sets the Nickname for Everyone in the Server.",
  category: "Managing"
};