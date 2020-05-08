exports.run = async (xtal, message, args, colors, emojis) => {

    let i = 0;
    const allmembers = message.guild.members.map(x => ` ${++i}. **${x.user.tag}** (${x.nickname || 'None.'})`).join("\n");
    message.channel.send(
`**__All Guild Members:__**
${allmembers}
`, {split: true})
  
};

exports.help = {
  name: "members",
  aliases: ['allmembers']
};

exports.conf = {
  usage: "members",
  aliases: "allmembers",
  description: "Displays all Guild Members.",
  category: "Info"
};