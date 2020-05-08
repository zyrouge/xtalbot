const db = require("quick.db");
const colors = require("../colors.json");
const emojis = require("../emoji.json");
const Enmap = require('enmap');
const config = require("../config.json");
const chatbot = require("../util/chat.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = async (xtal, message) => {
  
  if (message.author.bot) return;

  let prefix;
  if(message.channel.type == 'text') {
  let gprefix = await db.fetch(`guildPrefix_${message.guild.id}`);
  if(gprefix === null) gprefix = 'x?';
  prefix = gprefix;
  } else {
    prefix = `x?`;
  }
  
  xtal.prefix = prefix;

  const prefixMention = new RegExp(`^<@!?${xtal.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
  xtal.simpleEmbed(message, `My prefix on this guild is \`${xtal.prefix}\``);
  }
  
  if (message.guild && message.channel.type == 'text') {
    require("../util/word")(message, xtal);
    require("../util/invite")(message, xtal);
    require("../util/spam")(message, xtal);
    require("../util/mention")(message, xtal);
    require("../util/emoji")(message, xtal);
    require("../util/links")(message, xtal);

    //Custom Tags
    xtal.tags = new Enmap({
      name: "tags",
      fetchAll: false,
      autoFetch: true,
      cloneLevel: 'deep'
    });

    if (xtal.tags.has(message.guild.id)) {
      Object.keys(xtal.tags.get(message.guild.id)).forEach(tagid => {
        let tag = xtal.tags.get(message.guild.id)[tagid];
        if(tag.name) {
        if (message.content.toLowerCase() == tag.name.toLowerCase()) message.channel.send(tag.text.replace('@user', '<@' + message.author.id + '>'));
      }});
    }
    
    let chat = await db.fetch(`guildChat_${message.guild.id}`);
    if (message.channel.id === chat) {
      message.channel.startTyping();
      message.reply(await chatbot(message.content, message.author.username));
      message.channel.stopTyping();
    }
  }
  
  if(message.content.indexOf(prefix) !== 0) return;
  let Args = message.content.split(/\s+/g);
  const command = Args.shift().slice(prefix.length).toLowerCase();

  const cmd = xtal.commands.get(command) || xtal.commands.get(xtal.aliases.get(command));

  if (!cmd) return;

if(cmd.conf.guildOnly && !message.guild){
    return xtal.simpleEmbed(message, `\`\`${cmd.help.name}\`\` can only be used in **Guilds/Servers**`);
}
  
if (message.guild) {
  xtal.disabledcmd.ensure(message.guild.id, []);
  if(xtal.disabledcmd.get(message.guild.id).includes(cmd.help.name)) return xtal.simpleEmbed(message, `\`\`${cmd.help.name}\`\` has been **Disabled** on this Guild.`);
}

if(cmd.conf.category.toLowerCase() == "botowner" && !config.ownerID.includes(message.author.id)) return xtal.simpleEmbed(message, "You aren\'t the Bot Owner!");

if (!xtal.cooldowns.has(cmd.help.name)) {
	xtal.cooldowns.set(cmd.help.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = xtal.cooldowns.get(cmd.help.name);
const cooldownAmount = (cmd.conf.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
    const timeLeftduration = moment.duration((expirationTime - now)).format(" D [days], H [hrs], m [mins], s [secs]");
		return xtal.simpleEmbed(message, `Please wait **${timeLeftduration}** more second(s) before reusing the \`${cmd.help.name}\` command.`);
	}
}

  if (message.guild) {
  let memberPermissions = xtal.commands.get(cmd.conf.memberPermissions) || [];
  let botPermissions = xtal.commands.get(cmd.conf.botPermissions) || ["SEND_MESSAGES", "EMBED_LINKS"];

  if(!message.member.hasPermission(memberPermissions)) return xtal.noPerms(message, memberPermissions);
  if(!message.guild.me.hasPermission(memberPermissions)) return xtal.xnoPerms(message, botPermissions);
}
  
  let modonly = await db.fetch(`guildModOnly_${message.guild.id}`);
  if(modonly == null) modonly = false;
  if(message.guild && modonly == true) {
    if(!message.member.hasPermission('MANAGE_GUILD')) return;
  }
  
  xtal.cmdsRan.ensure(`cmdsRan_${message.author.id}`, 0);
  xtal.cmdsRan.ensure(`cmdsRan_GLOBAL`, 0);
  xtal.cmdsRan.inc(`cmdsRan_${message.author.id}`);
  xtal.cmdsRan.inc(`cmdsRan_GLOBAL`);

  message.flags = [];
  Args.forEach((arg, i) => {
    if(arg.startsWith("-")) message.flags.push(arg)
  });
  
  const args = Args.filter(word => !message.flags.includes(word));

  cmd.run(xtal, message, args, colors, emojis);

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

};