const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

  let state = await db.fetch(`guildJoinLock_${message.guild.id}`);
  if(state == null) state = false;
  let embed = new Discord.RichEmbed();
  if(args[0]) {
    switch(args[0].toLowerCase()) {
      case 'enable': await toggle('enable'); break;
      case 'disable': await toggle('disable'); break;
      case 'toggle': await toggle(); break;
      default: await toggle(); break;
    }
  } else {
    embed.setDescription(`Guild is **${state ? "Locked." : "Unlocked."}**`)
  }

    embed
    .setAuthor("Guild Lock", xtal.emojiUrl(emojis.settings))
    .setColor(colors.red)
    .setTimestamp()
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);

  async function toggle(type) {
    if((type && type == 'enable') || state == false) {
        await db.set(`guildJoinLock_${message.guild.id}`, true);
        embed.setDescription(`Guild **Locked!**`);
    } else if ((type && type == 'disable') || state == true) {
      await db.set(`guildJoinLock_${message.guild.id}`, false);
      embed.setDescription(`Guild **Unlocked!**`);
    };
  }
  
};

exports.help = {
  name: "joinlock",
  aliases: ['lockjoin']
};

exports.conf = {
  usage: "joinlock <enable/disable>",
  description: "Kicks the Member Joining when Enabled.",
  category: "Moderation"
};