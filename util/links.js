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
    let channels = automodsettings.domains_channels || [];
    let roles = automodsettings.domains_roles || [];
    let filteredLinks = automodsettings.domains_wrds.length > 0 ? automodsettings.domains_wrds : [];
    if(automodsettings.domains_toggle && !channels.includes(message.channel.id) && !message.member.roles.some(r => roles.includes(r.id))) {
      let match = 0;
      let filter = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      let args = message.content.split(" ");
      let matches = 0;
      for(let i = 0; i < args.length; i++) {
        if(filter.test(args[0])) ++matches;
      }
      if (matches == 0) return;
      let filtermatch = 0;
      filteredLinks.forEach(link => {
        if(message.content.includes(link)) ++filtermatch;
      });
      if(filtermatch !== 0) return;
      message.delete();
      message.reply(`No Links Allowed.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
      embed(message, 'No Links', xtal);
    };
  } catch(e) {};
};