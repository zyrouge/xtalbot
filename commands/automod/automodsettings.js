const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
  let construct = {
    words_words: [],
    words_channels: [],
    words_roles: [],
    words_toggle: false,
    
    message_time: 1,
    message_count: 2,
    message_channels: [],
    message_roles: [],
    message_action: null,
    message_toggle: false,
    
    domains_wrds: [],
    domains_channels: [],
    domains_roles: [],
    domains_toggle: false,
    
    emoji_channels: [],
    emoji_roles: [],
    emoji_toggle: false,
    
    mention_channels: [],
    mention_roles: [],
    mention_toggle: false,
    
    invite_channels: [],
    invite_roles: [],
    invite_toggle: false
  };
  
  xtal.automod.ensure(`${message.guild.id}`, construct);
  
  try {
  let automodsettings = xtal.automod.get(`${message.guild.id}`);
  const status = { false: "Disabled.", true: "Enabled." }
   
    let blackwords      = automodsettings.words_words.length > 0 ? automodsettings.words_words.join(", ") : 'None.';
    let blackchannels   = automodsettings.words_channels.length > 0 ? automodsettings.words_channels.map(x => message.guild.channels.get(x)).join(" | ") : 'None.';
    let blackroles      = automodsettings.words_roles.length > 0 ? automodsettings.words_roles.map(x => message.guild.roles.get(x)).join(" | ") : 'None.';
    let blacktoggle     = status[automodsettings.words_toggle];
    
    let messagechannels = automodsettings.message_channels.length > 0 ? automodsettings.message_channels.map(x => message.guild.channels.get(x)).join(" | ") : 'None.';
    let messageroles    = automodsettings.message_roles.length > 0 ? automodsettings.message_roles.map(x => message.guild.roles.get(x)).join(" | ") : 'None.';
    let messagecount    = automodsettings.message_count ? automodsettings.message_count : 'None.';
    let messageinterval = automodsettings.message_time ? automodsettings.message_time : 'None.';
    let messageaction   = automodsettings.message_action ? automodsettings.message_action == null ? 'None.' : automodsettings.message_action : 'None.';
    let messagetoggle   = status[automodsettings.message_toggle];
    
    let domainsblack    = automodsettings.domains_wrds.length > 0 ? automodsettings.domains_wrds.join(", ") : 'None.';
    let domainschannels = automodsettings.domains_channels.length > 0 ? automodsettings.domains_channels.map(x => message.guild.channels.get(x)).join(" | ") : 'None.';
    let domainsroles    = automodsettings.domains_roles.length > 0 ? automodsettings.domains_roles.map(x => message.guild.roles.get(x)).join(" | ") : 'None.';
    let domainstoggle   = status[automodsettings.domains_toggle];
    
    let emojichannels   = automodsettings.emoji_channels.length > 0 ? automodsettings.emoji_channels.map(x => message.guild.channels.get(x)).join(" | ") : 'None.';
    let emojiroles      = automodsettings.emoji_roles.length > 0 ? automodsettings.emoji_roles.map(x => message.guild.roles.get(x)).join(" | ") : 'None.';
    let emojitoggle     = status[automodsettings.emoji_toggle];
    
    let mentionchannels = automodsettings.mention_channels.length > 0 ? automodsettings.mention_channels.map(x => message.guild.channels.get(x)).join(" | ") : 'None.';
    let mentionroles    = automodsettings.mention_roles.length > 0 ? automodsettings.mention_roles.map(x => message.guild.roles.get(x)).join(" | ") : 'None.';
    let mentiontoggle   = status[automodsettings.mention_toggle];
    
    let invitechannels = automodsettings.invite_channels.length > 0 ? automodsettings.invite_channels.map(x => message.guild.channels.get(x)).join(" | ") : 'None.';
    let inviteroles    = automodsettings.invite_roles.length > 0 ? automodsettings.invite_roles.map(x => message.guild.roles.get(x)).join(" | ") : 'None.';
    let invitetoggle   = status[automodsettings.invite_toggle];
    
  let embed = new RichEmbed()
  .setAuthor(`AutoMod Settings`, message.guild.iconURL)
  .addField(`Word Filter`,
`**Words:** ${blackwords}
**Channels:** ${blackchannels}
**Roles:** ${blackroles}
**Status:** ${blacktoggle} `)
  
  .addField(`Message Spam`,
`**Channels:** ${messagechannels}
**Roles:** ${messageroles}
**Message Count:** ${messagecount} Message
**Message Interval: ** ${messageinterval} Seconds
**Action:** ${messageaction}
**Status:** ${messagetoggle} `)
  
  .addField(`Links Filter`,
`**Words:** ${domainsblack}
**Channels:** ${domainschannels}
**Roles:** ${domainsroles}
**Status:** ${domainstoggle} `)
  
  .addField(`Emoji Spam`,
`**Channels:** ${emojichannels}
**Roles:** ${emojiroles}
**Status:** ${emojitoggle} `)
  
  .addField(`Mass Mention Spam`,
`**Channels:** ${mentionchannels}
**Roles:** ${mentionroles}
**Status:** ${mentiontoggle} `)
  
  .addField(`Invite Links`,
`**Channels:** ${invitechannels}
**Roles:** ${inviteroles}
**Status:** ${invitetoggle} `)
  
  .setColor(colors.green)
  .setTimestamp()
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  message.channel.send(embed);
  } catch (e) {
    return xtal.cmdErr(message, e, 'automodsettings');
  }

};

exports.help = {
  name: "automodsettings",
  aliases: ['automodsettings', 'amsettings', 'configautomod', 'ams']
};

exports.conf = {
  usage: "automodsettings",
  examples: [],
  guildOnly: true,
  memberPermissions: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD", "MANAGE_MESSAGES"],
  description: "Shows the AutoMod Settings.",
  category: "AutoMod"
};