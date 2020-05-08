const config = require("../../config.json");

exports.run = async (xtal, message, args, colors) => {
  
  const Discord = require("discord.js");
  const fs = require("fs");
  const db = require('quick.db');
  let prefix = await db.fetch(`guildPrefix_${message.guild.id}`);
  if(prefix == null) prefix = "x?";
  
  let mod = args[0];
  
  if(!mod) {

    let moduleembed = new Discord.RichEmbed()
    .setAuthor(`Modules`, xtal.user.avatarURL)
    .setTimestamp()
    .setImage(config.footer)
    .setDescription(xtal.modules.map((x, i) => `${++i}. **${x.charAt(0).toUpperCase() + x.substring(1)}** \n`).join(""))
    .setColor(colors.white)
    .setFooter(xtal.user.username ,`${xtal.user.avatarURL}`);
    message.channel.send(moduleembed)

} else if(mod) {
  
  try {
  let argmod;
  switch(mod.toLowerCase()) {
    case 'configuration': argmod = 'Configuration'; break;
    case 'customcommands': argmod = 'CustomCommands'; break;
    case 'economy': argmod = 'Economy'; break;
    case 'fun': argmod = 'Fun'; break;
    case 'text': argmod = 'Text'; break;
    case 'games': argmod = 'Games'; break;
    case 'giveaway': argmod = 'Giveaway'; break;
    case 'verification': argmod = 'Verification'; break;
    case 'botowner': argmod = 'BotOwner'; break;
    case 'image': argmod = 'Image'; break;
    case 'leveling': argmod = 'Leveling'; break;
    case 'managing': argmod = 'Managing'; break;
    case 'misc': argmod = 'Misc'; break;
    case 'moderation': argmod = 'Moderation'; break;
    case 'music': argmod = 'Music'; break;
    case 'nsfw': argmod = 'NSFW'; break;
    case 'reactionroles': argmod = 'Reactions'; break;
    case 'automod': argmod = 'AutoMod'; break;
    case 'nitro': argmod = 'Nitro'; break;
    case 'verification': argmod = 'Verification'; break;
    case 'utility': argmod = 'Utility'; break;
    case 'info': argmod = 'Info'; break;
    case 'help': argmod = 'Help'; break;
    case 'invites': argmod = 'Invites'; break;
    default: argmod = undefined;
  }

  if(!argmod) return xtal.simpleEmbed(message, `No Modules was Found!`);
  let gotcmds = xtal.commands.filter(x => x.conf.category == argmod);
  if(!gotcmds) return xtal.simpleEmbed(message, `No Modules was Found!`);

  let cmds = [];
  gotcmds.forEach(command => {
    cmds.push(`**${prefix}${command.help.name}** - ${command.conf.description}`)
  });    

  let first = 0;
  const msg = await message.channel.send({ embed: embedF(first) });
  const reaction1 = await msg.react('◀');
  const reaction2 = await msg.react('▶');
  const reaction3 = await msg.react('⭕');
  const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
    time: 60000
  });
  collector.on('collect', (r) => {
    let addcount = length(first + 30);
    let remcount = length(first - 30);
    if (r.emoji.name === '▶') {
      if(addcount > 0) {
        r.remove(r.users.filter(u => u === message.author).first());
        first += 30;
        msg.edit({ embed: embedF(first) });
      } else {
        r.remove(r.users.filter(u => u === message.author).first());
      }
    }
    else if (r.emoji.name === '◀') {
      if(remcount > 0) {
        r.remove(r.users.filter(u => u === message.author).first());
        first -= 30;
        msg.edit({ embed: embedF(first) });
      } else {
        r.remove(r.users.filter(u => u === message.author).first());
      }
    } else if (r.emoji.name === '⭕')
    {
      collector.stop()
    }
  });

  collector.on('end', () => {
    msg.clearReactions();
  });

  function length(start) {
    let arr = cmds;
    arr = arr.slice(start, start + 30);
    return arr.length;
  }

  function embedF(start) {
    let arr = cmds;
    arr = arr.slice(start, start + 30);
    let totalpages = Math.ceil(cmds.length / 30);
    let currentpages = Math.ceil(start / 30) + 1;
    const embed = new Discord.RichEmbed()
    .setAuthor(`Module - ${argmod}`, xtal.user.avatarURL)
    .setColor(colors.white)
    .setFooter(`Page: ${currentpages}/${totalpages} | ` + xtal.user.username ,`${xtal.user.avatarURL}`)
    .setTimestamp()
    .setDescription(arr.map((x) => ` \`-\` ${x}`).join("\n"))
    .setImage(config.footer)
    .addField("Links", `[Support Server](https://discordapp.com/invite/8jdDWzk) | [ZyroBots](https://zyrobots.ga) | [GitHub](https://github.com/zyrouge/)`);
    return embed;
  }

} catch(e) {
    xtal.simpleEmbed(message, `Something Went Wrong.\n**Err: ${e}**`);
}

};
  
  };

exports.help = {
  name: "modules",
  aliases: ['categories', 'category']
};

exports.conf = {
  usage: "modules <name>",
  description: "Sends the Modules Menu.",
  category: "Help"
};