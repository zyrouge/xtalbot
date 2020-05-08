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
  let chatc;
  if(message.mentions.channels.first()) {
    chatc = message.mentions.channels.first()
  } else if(args[0]) {
    chatc = message.guild.channels.find('id', args[0]) || message.guild.channels.find('name', args[0])
  }
  
  if(!chatc || !automodsettings.words_channels.includes(chatc.id)) return xtal.cmdErr(message, 'Mention a Whitelist Channel', this.help.name);

    for( var i = 0; i < automodsettings.words_channels.length; i++) { 
       if (automodsettings.words_channels[i] === chatc.id) {
         automodsettings.words_channels.splice(i, 1);
         console.log('yes')
       }
    }
  xtal.automod.set(`${message.guild.id}`, automodsettings);
  xtal.simpleEmbed(message, `Removed Whitelisted Channel: **${chatc}**`)
  } catch (e) {
    return xtal.cmdErr(message, e, this.help.name);
  }
  
};

exports.help = {
  name: "removewhitelistchannel",
  aliases: ['removewchannel', 'removewhitelistchannels']
};

exports.conf = {
  usage: "removewhitelistchannel [channel]",
  examples: ["general", "#links"],
  guildOnly: true,
  memberPermissions: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD", "MANAGE_MESSAGES"],
  description: "Remove Channels from Whitelist Channels.",
  category: "AutoMod"
};