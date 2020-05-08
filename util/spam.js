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
const db = require("quick.db");
const util = require('util')

module.exports = async (message, xtal) => {
    try {
    let usermessages = xtal.ldb.usermessages;
    usermessages.push({
      "time": Date.now(),
      "author": message.author.id,
      "guild": message.guild.id
    });
    if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('MANAGE_MESSAGES')) return;
    xtal.automod.ensure(`${message.guild.id}`, construct);
    let automodsettings = xtal.automod.get(`${message.guild.id}`);
    let channels = automodsettings.message_channels || [];
    let roles = automodsettings.message_roles || [];
    let maxInterval = (automodsettings.message_time || 1) * 1000;
    let maxMessages = automodsettings.message_count || 2;
    let spamMatches = usermessages.filter((u) => u.time > Date.now() - maxInterval && u.author === message.author.id && u.guild === message.guild.id).length;
    let action = automodsettings.message_action || null;
    if(automodsettings.message_toggle && !channels.includes(message.channel.id) && !message.member.roles.some(r => roles.includes(r.id))) {
      if(spamMatches == maxMessages) {
        if(!action || action.toLowerCase() == 'none' || action.toLowerCase() == null) {
          message.reply(`Don\'t Spam.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
          embed(message, 'Spamming.', xtal);
        }
        if(action == 'warn') {
          try {
            let warns = await db.fetch(`guildWarns_${message.author.id}_${message.guild.id}`);
            if(warns == null) warns = 0;
            await db.set(`guildWarns_${message.author.id}_${message.guild.id}`, ++warns);
            message.reply(`**${message.author.tag}**(${message.author.id}) was **Warned** for **Spamming**.`).catch(() => {});
            embed(message, 'Spamming. (Action Taken: **Warn**)', xtal);
          } catch(e) {
            message.channel.send(`Unable **Warn** ${message.author} due to ${e}.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
            embed(message, `Spamming. (Unable to Take Action: **Warn** - ${e})`, xtal);
          }
        }
        if(action == 'kick') {
          if (!message.member.kickable) {
            message.channel.send(`Unable **Kick** ${message.author}.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
            embed(message, 'Spamming. (Unable to Take Action: **Kick**)', xtal);
          }
          else {
            message.member.kick("Xtal AutoMod. Reason: Spamming.");
            message.channel.send(`**${message.author.tag}**(${message.author.id}) was **Kicked** for **Spamming**.`).catch(() => {});
            embed(message, 'Spamming. (Action Taken: **Kick**)', xtal);
          }}
        if(action == 'ban') {
          if (!message.member.bannable) {
            message.channel.send(`Unable **Ban** ${message.author}.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
            embed(message, 'Spamming. (Unable to Take Action: **Ban**)', xtal);
          }
          else {
            message.member.ban("Xtal AutoMod. Reason: Spamming.");
            message.channel.send(`**${message.author.tag}**(${message.author.id}) was **Banned** for **Spamming**.`).catch(() => {});
            embed(message, 'Spamming. (Action Taken: **Ban**)', xtal);
          }}
        if(action == 'mute') {
          let muterole = message.guild.roles.find(`name`, "Muted");
          if(!muterole){ try{ muterole = await message.guild.createRole({ name: "Muted", color: "#000000", permissions:[] })
                              message.guild.channels.forEach(async (channel, id) => {
                              await channel.overwritePermissions(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false }); }); }catch(e){} }
          if (muterole.position >= message.guild.me.highestRole.position) {
            message.channel.send(`Unable **Mute** ${message.author}.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
            embed(message, `Spamming. (Unable to Take Action: **Mute**)`, xtal);
        } else {
          await(message.member.addRole(muterole.id));
          message.channel.send(`**${message.author.tag}**(${message.author.id}) was **Muted** for **Spamming**.`).catch(() => {});
          embed(message, 'Spamming. (Action Taken: **Mute**)', xtal);
        }}
       if(action == 'delete') {
          if (!message.deletable) {
            message.channel.send(`Unable **Purge Messages of** ${message.author}.`).then(msg => { msg.delete(10000).catch(() => {}); }).catch(() => {});
            embed(message, 'Spamming. (Unable to Take Action: **Purge**)', xtal);
          }
          else {
            await message.channel.fetchMessages({limit: 25})
                .then((messages) => {
                    var filterUser = message.author.id;
                    var filtered = messages.filter(m => m.author.id === filterUser).array().slice(0, maxMessages);      
                    message.channel.bulkDelete(filtered)
                }).catch(console.error);
            message.channel.send(`**${message.author.tag}**(${message.author.id})'s Messages was **Purged** for **Spamming**.`).catch(() => {});
            embed(message, 'Spamming. (Action Taken: **Purge**)', xtal);
          }}
    }}} catch(e) {};
};