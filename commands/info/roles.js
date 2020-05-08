exports.run = async (xtal, message, args, colors, emojis) => {

    let i = 0;
    const allroles = message.guild.roles.filter(x => x.name != '@everyone').map(x => ` ${++i}. **${x.name}** (${parseInt(message.guild.roles.size - x.position + 1)})`).join("\n");
    message.channel.send(
`**__All Guild Roles:__**
${allroles}
`, {split: true})
  
};

exports.help = {
  name: "roles",
  aliases: ['allroles']
};

exports.conf = {
  usage: "roles",
  aliases: "allroles",
  description: "Displays all the Server Roles.",
  category: "Info"
};