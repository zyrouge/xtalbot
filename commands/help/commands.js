const config = require("../../config.json");

exports.run = async (xtal, message, args, colors) => {
  
try {
  let channel;
  if(message.channel.type == "dm") channel = message.channel;
  else if(message.channel.type == "text") channel = message.author;
  const Discord = require("discord.js");
  let prefix = xtal.prefix;

  let cmds = [];
  xtal.commands.forEach(command => {
    cmds.push(`**${prefix}${command.help.name}** - ${command.conf.description}`)
  });

  let first = 0;
  const msg = await message.channel.send({ embed: embedF(first) });
  const reaction1 = await msg.react('◀️');
  const reaction2 = await msg.react('▶️');
  const reaction3 = await msg.react('⏺️');
  const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
    time: 60000
  });
  collector.on('collect', (r) => {
    let addcount = length(first + 30);
    let remcount = length(first - 30);
    if (r.emoji.name === '▶️') {
      if(addcount > 0) {
        r.remove(r.users.filter(u => u === message.author).first());
        first += 30;
        msg.edit({ embed: embedF(first) });
      } else {
        r.remove(r.users.filter(u => u === message.author).first());
      }
    }
    else if (r.emoji.name === '◀️') {
      if(remcount > 0) {
        r.remove(r.users.filter(u => u === message.author).first());
        first -= 30;
        msg.edit({ embed: embedF(first) });
      } else {
        r.remove(r.users.filter(u => u === message.author).first());
      }
    } else if (r.emoji.name === '⏺️')
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
    .setAuthor("Commands", xtal.user.avatarURL)
    .setColor(colors.white)
    .setFooter(`Page: ${currentpages}/${totalpages} | ` + xtal.user.username ,`${xtal.user.avatarURL}`)
    .setTimestamp()
    .setDescription(arr.map((x) => ` \`-\` ${x}`).join("\n"))
    .setImage(config.footer)
    .addField(`Help`,`[Commands](${config.weburl}/commands)\n[Stats](${config.weburl}/stats)`)
    .addField("Links", `[Support Server](https://discordapp.com/invite/8jdDWzk) | [ZyroBots](https://zyrobots.ga) | [GitHub](https://github.com/zyrouge/)`);
    return embed;
  }

} catch(e) {
    xtal.simpleEmbed(message, `Seems like your DM's are Disabled! Try again after enabling them.\n**Err: ${e}**`);
}
};

exports.help = {
  name: "commands",
  aliases: ['command', 'cmds']
};

exports.conf = {
  usage: "commands",
  description: "Sends a Commands List.",
  category: "Help"
};