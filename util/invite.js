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
    xtal.automod.ensure(`${message.guild.id}`, construct);
    let automodsettings = xtal.automod.get(`${message.guild.id}`);
    let channels = automodsettings.invite_channels || [];
    let roles = automodsettings.invite_roles || [];
    const filterlinks = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`, `discordapp`, `discordapp`, `discordapp.com/`, `discordapp. com`, `discordapp .com`, `discordapp . com`, `discordapp. com/`, `discordapp .com/`, `discordapp . com/`, `discordapp. com /`, `discordapp .com /`, `discordapp . com /`]
    if(automodsettings.invite_toggle && !channels.includes(message.channel.id) && !message.member.roles.some(r => roles.includes(r.id))){
      if(filterlinks.some(word => message.content.toLowerCase().includes(word))){
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")){
          message.delete();
          message.reply(`No Invites Allowed.`).then(msg => {
            msg.delete(10000).catch(() => {});
          }).catch(() => {});
          xtal.automodEmbed(message, 'Invite Link');
    }}}
    } catch(e) {};
  }