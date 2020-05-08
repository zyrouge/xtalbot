const Enmap = require("enmap");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {
  try {
    let argcmd = args.join(" ").toLowerCase();
    if (!argcmd)
      return xtal.simpleEmbed(message, "Mention a **Command Name**.");
    xtal.disabledcmd.ensure(message.guild.id, []);
    const getstruct = xtal.disabledcmd.get(message.guild.id);
    if (xtal.commands.has(argcmd) || xtal.aliases.has(argcmd)) {
      if (xtal.commands.has(argcmd)) {
        argcmd = xtal.commands.get(argcmd).help.name;
      } else if (xtal.aliases.has(argcmd)) {
        argcmd = xtal.aliases.get(argcmd);
      }
    } else {
      xtal.simpleEmbed(message, "Command does not **Exist**.");
      return;
    }
    if (xtal.disabledcmd.get(message.guild.id).includes(argcmd))
      return xtal.simpleEmbed(message, "Command already **Disabled**.");

    await xtal.disabledcmd.push(message.guild.id, argcmd);

    xtal.simpleEmbed(message, `\`\`${argcmd}\`\` has been **Disabled**.`);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.help = {
  name: "cmddisable",
  aliases: ['disablecmd']
};

exports.conf = {
  usage: "cmddisable [cmd]",
  aliases: "None.",
  description: "Disables a Command in the Guild.",
  category: "Configuration"
};
