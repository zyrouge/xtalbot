const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
    if(!args.join(" ")) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(m => m.name.toLowerCase() === args.join(" ").toLowerCase());
    if(!gRole) return message.reply("Couldn't find that role.");

    const status = {
        false: "No",
        true: "Yes"
      }

    let embed = new RichEmbed()
    .setTitle(`Role Information`)
    .setColor(colors.white)
    .addField("ID", gRole.id, true)
    .addField("Name", gRole.name, true)
    .addField("Mention", `<@&${gRole.id}>`, true)
    .addField("Hex", gRole.hexColor, true)
    .addField("Members", gRole.members.size, true)
    .addField("Position", `${parseInt(message.guild.roles.size - gRole.position + 1)}`, true)
    .addField("Hoisted", status[gRole.hoist], true)
    .addField("Mentionable", status[gRole.mentionable], true)
    .addField("Managed", status[gRole.managed], true)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setTimestamp();
    
message.channel.send(embed);
  
};

exports.help = {
  name: "roleinfo",
  aliases: ['ri']
};

exports.conf = {
  usage: "roleinfo",
  aliases: "ri",
  description: "Shows the Role Information.",
  category: "Info"
};