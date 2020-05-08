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
    let channels = automodsettings.emoji_channels || [];
    let roles = automodsettings.emoji_roles || [];
    let nativeEmojisRegExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    let customEmojisRegExp = /<(?:a)?:[a-z0-9_-]{1,256}:[0-9]{16,19}>/gi;
    let nativeEmojis = message.content.match(nativeEmojisRegExp) || [];
    let customEmojis = message.content.match(customEmojisRegExp) || [];
    let emojis = nativeEmojis.concat(customEmojis);
    let cleanMessage = message.content.replace(nativeEmojisRegExp, '');
    cleanMessage = cleanMessage.replace(customEmojisRegExp, '');
    cleanMessage = cleanMessage.trim();
    let emojiPercentage = emojis.length / (cleanMessage.length + emojis.length) * 100;
    
    if (automodsettings.emoji_toggle && !channels.includes(message.channel.id) && !message.member.roles.some(r => roles.includes(r.id))) {
      if(emojiPercentage > 50) {
        if(message.content.split(" ")[0].length == message.content.length) return;
        message.delete();
        message.reply(`No Emoji Spam Allowed.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
        embed(message, 'Emoji Spam', xtal);
    }
    }
  } catch(e) {};
};