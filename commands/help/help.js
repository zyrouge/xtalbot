const config = require("../../config.json");

exports.run = async (xtal, message, args, colors) => {
  
  const Discord = require("discord.js");
  const fs = require("fs");
  const db = require('quick.db');
  let prefix = await db.fetch(`guildPrefix_${message.guild.id}`);
  if(prefix == null) prefix = "x?";

  let cmd = args[0];
  
  if(!cmd) {

    let i = 0;
    let moduleembed = new Discord.RichEmbed()
    .setAuthor(`Help Menu`, xtal.user.avatarURL)
    .setTimestamp()
    .setImage(config.footer)
    .addField(`Dashboard`,`[Click Here](${config.weburl}) or **Visit** \`\` ${config.weburl} \`\``)
    .addField(`Commands`,`[Click Here](${config.weburl}/commands) or use \`\` x?commands \`\` for All **Commands**`)
    .addField(`Modules`, `Use \`\` x?modules \`\` for All **Modules**`)
    .addField(`Info`, `Use \`\` x?help <name> \`\` for **Command Information**`)
    .addField(`Search`, `Use \`\` x?commandsearch <name> \`\` to Search for **Commands**`)
    .addField(`Stats`, `[Click Here](https://status.${config.web}) or Use \`\` x?botinfo \`\` for **Xtal Statistics**`)
    .addField(`Updates/ChangeLogs`, `[Click Here](https://changelogs.${config.web}) or Use \`\` x?botinfo \`\` for **Xtal Statistics**`)
    .addField(`Docs`, `[Click Here](https://docs.${config.web}) for **Xtal Documents**`)
    .addField(`Donate/Premium`, `Visit \`\` https://www.patreon.com/zyrougedev \`\` or [Click Here](https://www.patreon.com/zyrougedev) to **Donate** or get **Premium**`)
    .addField(`Support`, `[Click Here](${config.server}) for **Xtal Discord Server**`)
    .setColor(colors.white)
    .setFooter(xtal.user.username ,`${xtal.user.avatarURL}`);
    message.channel.send(moduleembed)

} else if(cmd) {

  if(xtal.commands.has(cmd) || xtal.aliases.has(cmd)) {
    cmd = xtal.commands.get(cmd) || xtal.commands.get(xtal.aliases.get(cmd));
    let name = cmd.help.name;
    let usage = cmd.conf.usage;
    let description = cmd.conf.description;
    let aliases = cmd.help.aliases;
    let category = cmd.conf.category;
    const helpembed2 = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .setTimestamp()
    .setImage(config.footer)
    .addField("Command", prefix + name)
    .addField("Description", description)
    .addField("Aliases", aliases.length > 0 ? aliases.join(", ") : "None.")
    .addField("Category", category)
    .addField("Usage", prefix + usage);
    message.channel.send(helpembed2)
  } else {
    message.channel.send("Command doesn't exist.")
  }
  } else {
    xtal.simpleEmbed(message, "Seems like Something Went WRONG!")
  }
  
  };

exports.help = {
  name: "help",
  aliases: ['h']
};

exports.conf = {
  usage: "help <command>",
  description: "Sends a Help Menu.",
  category: "Help"
};