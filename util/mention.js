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

const embed = require("./automodembed");

module.exports = async (message, xtal) => {
  try {
    if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('MANAGE_MESSAGES')) return;
    xtal.automod.ensure(`${message.guild.id}`, construct);
    let automodsettings = xtal.automod.get(`${message.guild.id}`);
    let channels = automodsettings.mention_channels || [];
    let roles = automodsettings.mention_roles || [];
    let filterLength = automodsettings.message_count || 3;
    if (automodsettings.mention_toggle && !channels.includes(message.channel.id) && !message.member.roles.some(r => roles.includes(r.id))) {
      if(message.mentions.users.size >= filterLength) {
        message.delete();
        message.reply(`No Mention Spam Allowed.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
        embed(message, 'Mention Spam', xtal);
    }
    }
  } catch(e) {};
};