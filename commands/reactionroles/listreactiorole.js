const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
  xtal.reactionRoles.ensure(message.guild.id, {});

  let str = '';
  let str2 ='';
  let str3 = '';
  let str4 = '';
  let str5 = '';
  let i = 0;

    try {
      Object.keys(xtal.reactionRoles.get(message.guild.id)).forEach(groupid => {
        let group = xtal.reactionRoles.get(message.guild.id)[groupid];
        if (str.length < 1985) { str += `**${++i}**. ${group.name} \n`; }
        else if (str2.length < 1985) { str2 += `**${++i}**. ${group.name} \n`; }
        else if (str3.length < 1985) { str3 += `**${++i}**. - ${group.name} \n`; }
        else if (str4.length < 1985) { str4 += `**${++i}**. - ${group.name} \n`; }
        else { str5 +=`**${++i}**. - ${group.name} \n`; }
      });

      if (str5 && str4 && str3 && str2 && str) {
        new rm.menu(message.channel,
          message.author.id,
          [new Discord.RichEmbed({title:'Reaction Roles List | 1/5', color: 16777215, description: str,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 2/5', color: 16777215, description: str2,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 3/5', color: 16777215, description: str3,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 4/5', color: 16777215, description: str4,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 5/5', color: 16777215, description: str5,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }})]);
      } else if (!str5 && str4 && str3 && str2 && str) {
        new rm.menu(message.channel,
          message.author.id,
          [new Discord.RichEmbed({title:'Reaction Roles List | 1/4', color: 16777215, description: str,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 2/4', color: 16777215, description: str2,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 3/4', color: 16777215, description: str3,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 4/4', color: 16777215, description: str4,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }})]);
      } else if (!str5 && !str4 && str3 && str2 && str) {
        new rm.menu(message.channel,
          message.author.id,
          [new Discord.RichEmbed({title:'Reaction Roles List | 1/3', color: 16777215, description: str,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 2/3', color: 16777215, description: str2,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 3/3', color: 16777215, description: str3,footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }})]);
      } else if (!str5 && !str4 && !str3 && str2 && str) {
        new rm.menu(message.channel,
          message.author.id,
          [new Discord.RichEmbed({title:'Reaction Roles List | 1/2', color: 16777215, description: str, footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}),
           new Discord.RichEmbed({title:'Reaction Roles List | 2/2', color: 16777215, description: str2, footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }})]);
      } else if (!str5 && !str4 && !str3 && !str2 && str) {
        message.channel.send({embed: {title:'Reaction Roles List | 1/1', color: 16777215, description: str, footer: { icon_url: xtal.user.avatarURL, text: xtal.user.username }}});
      } else {
        return xtal.simpleEmbed(message, "No Reaction Role Groups Found in this Guild.")
      }

    } catch (err) {
      message.channel.send('There was an error!\n' + err).catch();
    }

};

exports.help = {
  name: "listreactionrole",
  aliases: ['listreactionroles','listrr']
};

exports.conf = {
  usage: "listreactionrole",
  description: "Reaction Roles Lists.",
  category: "ReactionRole"
};