const { RichEmbed } = require('discord.js');
const db = require("quick.db");
const {caseNumber} = require('../../util/caseNumber.js');

async function embedSan(embed) {
    embed.message ? delete embed.message : null;
    embed.footer ? delete embed.footer.embed : null;
    embed.provider ? delete embed.provider.embed : null;
    embed.thumbnail ? delete embed.thumbnail.embed : null;
    embed.image ? delete embed.image.embed : null;
    embed.author ? delete embed.author.embed : null;
    embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
    return embed;
  }

exports.run = async (xtal, message, args) => {
    
    let fetchchannel = await db.fetch(`guildModLogs_${message.guild.id}`);
    if(fetchchannel == null || fetchchannel == 'None.') return;
    let modlog = xtal.channels.get(fetchchannel);
    if(!modlog) return;
    const caseNumber = args.shift();

  const newReason = args.join(' ');

  await modlog.fetchMessages({limit:100}).then((messages) => {
    const caseLog = messages.filter(m => m.author.id === xtal.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.startsWith('Case') &&
      m.embeds[0].footer.text === `Case ${caseNumber}`
    ).first();
    modlog.fetchMessage(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);
      embed.description = embed.description.replace(`No reason provided`, newReason);
      logMsg.edit({embed});
    });
});

};

exports.help = {
  name: "reason",
  aliases: []
};

exports.conf = {
  usage: "reason [case] [reason]",
  aliases: "None.",
  description: "Changes the Case Reason.",
  category: "Moderation"
};