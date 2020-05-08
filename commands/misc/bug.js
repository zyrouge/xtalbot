const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  try {
    let invite = await message.channel.createInvite();
    let text = args.join(" ");
    if(!args.join(" ")) return xtal.cmdErr(message, "No Bug", 'bug');
    let channel = xtal.channels.get("629371724735053855");
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | ${message.author.id}`, message.author.avatarURL)
    .setColor(colors.black)
    .setDescription(`**Bug:** `+text)
    .addField(`User`, `${message.author.tag} | ${message.author.id}`)
    .addField(`Guild`, `${message.guild.name} | ${message.guild.id} | ${invite}`)
    .addField(`Channel`, `${message.channel.name} | ${message.channel.id}`)
    .setTimestamp();
    channel.send(embed);
    message.channel.send(`Thanks for your Support! Bug has been Reported.`);
} catch(e) {
  message.channel.send(e)
}
  
};

exports.help = {
  name: "bug",
  aliases: ['report']
};

exports.conf = {
  usage: "bug [bug]",
  aliases: "report",
  description: "Report a Bot Bug.",
  category: "Misc",
  cooldown: 60
};