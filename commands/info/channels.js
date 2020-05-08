exports.run = async (xtal, message, args, colors, emojis) => {

    let i = 0;
    const allchannels = message.guild.channels.map(x => ` ${++i}. **${x.name}** (${x.id})`).join("\n");
    message.channel.send(
`**__All Guild Channels:__**
${allchannels}
`, {split: true})
  
};

exports.help = {
  name: "channels",
  aliases: ['allchannels']
};

exports.conf = {
  usage: "roles",
  description: "Displays all the Server Channels.",
  category: "Info"
};