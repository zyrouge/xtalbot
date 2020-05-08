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
      
    let embed = new RichEmbed()
      .setAuthor(`AutoMod Toggle Help`)
      .addField(`All Modules`, `
**Word** - Filters the Words that are Blacklisted
**Spam** - Message Spam Detector
**Links** - Links Detector
**Emoji** - Emoji Spam Detector
**Mention** - Mention Spam Detector
**Invite** - Invites Detector
`)    .setDescription('**Examples:** \n' + this.conf.examples.join('\n'))
      .setTimestamp()
      .setColor(colors.orange)
      .setFooter(xtal.user.username, xtal.user.avatarURL);
      
    if(!args[0]) {

      message.channel.send(embed);
    
    }
    
    if(args[0]) {

      switch(args[0].toLowerCase()) {
          case 'word':  if(automodsettings.words_toggle) {
                        automodsettings.words_toggle = false;
                        xtal.simpleEmbed(message, 'Word Filter has been **Disabled**.')
                      } else {
                        automodsettings.words_toggle = true;
                        xtal.simpleEmbed(message, 'Word Filter has been **Enabled**.')
                      }
                      xtal.automod.set(message.guild.id, automodsettings);
                      break;
          
          case 'spam':  if(automodsettings.message_toggle) {
                        automodsettings.message_toggle = false;
                        xtal.simpleEmbed(message, 'Message Spam Detector has been **Disabled**.')
                      } else {
                        automodsettings.message_toggle = true;
                        xtal.simpleEmbed(message, 'Message Spam Detector has been **Enabled**.')
                      }
                      xtal.automod.set(message.guild.id, automodsettings);
                      break;
          
          case 'links':  if(automodsettings.domains_toggle) {
                        automodsettings.domains_toggle = false;
                        xtal.simpleEmbed(message, 'Link Detector has been **Disabled**.')
                      } else {
                        automodsettings.domains_toggle = true;
                        xtal.simpleEmbed(message, 'Link Filter has been **Enabled**.')
                      }
                      xtal.automod.set(message.guild.id, automodsettings);
                      break;
          
          case 'emoji':  if(automodsettings.emoji_toggle) {
                        automodsettings.emoji_toggle = false;
                        xtal.simpleEmbed(message, 'Emoji Spam Detector has been **Disabled**.')
                      } else {
                        automodsettings.emoji_toggle = true;
                        xtal.simpleEmbed(message, 'Emoji Spam Detector has been **Enabled**.')
                      }
                      xtal.automod.set(message.guild.id, automodsettings);
                      break;
          
          case 'mention':  if(automodsettings.mention_toggle) {
                        automodsettings.mention_toggle = false;
                        xtal.simpleEmbed(message, 'Mention Spam Detector has been **Disabled**.')
                      } else {
                        automodsettings.mention_toggle = true;
                        xtal.simpleEmbed(message, 'Mention Spam Detector has been **Enabled**.')
                      }
                      xtal.automod.set(message.guild.id, automodsettings);
                      break;
          
          case 'invite':  if(automodsettings.invite_toggle) {
                        automodsettings.invite_toggle = false;
                        xtal.simpleEmbed(message, 'Invite Detector has been **Disabled**.')
                      } else {
                        automodsettings.invite_toggle = true;
                        xtal.simpleEmbed(message, 'Invite Detector has been **Enabled**.')
                      }
                      xtal.automod.set(message.guild.id, automodsettings);
                      break;
          
        default: message.channel.send(embed); break;
      }
    
    }
  
      
    } catch (e) {
      return xtal.cmdErr(message, e, this.help.name);
    }
    
  };
  
  exports.help = {
    name: "toggleautomod",
    aliases: ['toggleam', 'tam', 'tautomod']
  };
  
  exports.conf = {
    usage: "toggleautomod [text]",
    examples: ["word", "invite"],
    guildOnly: true,
    memberPermissions: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD", "MANAGE_MESSAGES"],
    description: "Adds Words to Blacklist Words.",
    category: "AutoMod"
  };