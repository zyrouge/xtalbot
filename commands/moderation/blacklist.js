const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  let state = await db.fetch(`guildBlackListed_${message.guild.id}`);
  if(state == null) state = [];
  let embed = new Discord.RichEmbed();
  if(args[0] && args[0] == "add" && args[1]) {
    if(isNaN(args[1])) return xtal.simpleEmbed(message, `**Invalid ID.** [${args[1]}]`);
    state.push(args[1]);
  }
  if(args[0] && args[0] == "remove" && args[1]) {
    if(isNaN(args[1])) return xtal.simpleEmbed(message, `**Invalid ID.** [${args[1]}]`);
    for(var i = state.length - 1; i >= 0; i--) {
      if(state[i] === args[1]) {
        state.splice(i, 1);
      }
  }
  }
  if(args[0] && args[0] == 'clear') state = [];

  await db.set(`guildBlackListed_${message.guild.id}`, state);
  const allmembers = state.length > 0 ? state.map((x, i) => ` ${++i}. **${x}** (${xtal.users.get(x) ? xtal.users.get(x).tag : '-'})`).join("\n") : "No Blacklisted IDs found.";
    message.channel.send(
`**__Blacklisted Members:__**
${allmembers}
`, {split: true});
  
};

exports.help = {
  name: "blacklist",
  aliases: ['blacklists', 'blacklisted']
};

exports.conf = {
  usage: "blacklist <add/remove/clear/show> <id>",
  description: "Shows or Blacklists the User and Prevent from Joining.",
  category: "Moderation"
};