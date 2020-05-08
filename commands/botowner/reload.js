exports.run = async (xtal, message, args, colors, emojis) => {
  
    let command;
    if (xtal.commands.has(args[0])) {
      command = args[0];
    } else if (xtal.aliases.has(args[0])) {
      command = xtal.aliases.get(args[0]);
    }
    if (!command) {
      return message.channel.send(`I cannot find the command: **${args[0]}**`);
    } else {
      message.channel.send(`Reloading: ${command}`)
        .then(m => {
          xtal.reload(command)
            .then(() => {
              m.edit(`Successfully reloaded: **${command}**`);
            })
            .catch(e => {
              m.edit(`Command reload failed: **${command}**\n\`\`\`${e.stack}\`\`\``);
            });
        });
  }
  
};

exports.help = {
  name: "reload",
  aliases: ['rel']
};

exports.conf = {
  usage: "reload",
  aliases: "None.",
  description: "Reload Command. [Owner]",
  category: "BotOwner"
};