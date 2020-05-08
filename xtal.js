//Local Vars
const Discord = require("discord.js");
const xtal = require("./base/xtal.js");
require('./util/music')(xtal);
require('./util/embeds')(xtal);
require('./util/rrpage')(xtal);
require('./util/functions')(xtal);
const fs = require('fs');
const Enmap = require("enmap");
const SQLite = require("better-sqlite3");
const db = require("quick.db");
const Util = require('discord.js');
const config = require('./config.json');
const colors = require('./colors.json');
const embeds = require("./util/embeds.js");
const router = require('express');
const cooldowns = new Discord.Collection();
const levelcooldowns = new Discord.Collection();
const eco = new db.table('ECONOMY');
let usermessages = [];

//Global Vars
xtal.queue = new Map();
xtal.afk = new Map();
xtal.disabledcmd = new Enmap({ name: "disabledcmd", fetchAll: false,  autoFetch: true, cloneLevel: 'deep' });
xtal.reactionRoles = new Enmap({ name: "reactionRoles", fetchAll: false,   autoFetch: true,   cloneLevel: 'deep' });
xtal.levels = new Enmap({ name: "levels", fetchAll: false,   autoFetch: true,   cloneLevel: 'deep' });
xtal.glevels = new Enmap({ name: "glevels", fetchAll: false,   autoFetch: true,   cloneLevel: 'deep' });
xtal.automod = new Enmap({ name: "automod" });
xtal.todoZY = new Enmap({ name: "todoZY" });
xtal.xtalPremium = new Enmap({ name: "xtalPremium" });
xtal.cmdsRan = new Enmap({ name: "cmdsRan" });
xtal.config = config;
xtal.embeds = embeds;
xtal.cooldowns = cooldowns;
xtal.eco = eco;
xtal.logger = require("./util/logger");
xtal.ldb = {
  usermessages: usermessages
};

//Ping Glitch
setInterval(() => {
  const http = require('http');
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Event Handlers
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  xtal.logger.log(`Loaded ${files.length} Events`, "load");
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    xtal.on(eventName, event.bind(null, xtal));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

//Command Handlers
const modules = ['botowner', 'configuration','customcommands','economy','fun','games','giveaway','image','leveling','managing','misc','moderation','music','nsfw','reactions','text','tickets','utility','automod', 'info', 'help','reactionroles', 'nitro', 'verification', 'invites'];
xtal.modules = modules;
xtal.commands = new Enmap();
xtal.cmds = new Enmap();
xtal.aliases = new Enmap();
xtal.categories = new Enmap();
modules.forEach(c => {
  fs.readdir(`./commands/${c}/`, (err, files) => {
    if (err) throw err;
    xtal.logger.log(`Loaded ${files.length} commands of module ${c}`, "load");
    files.forEach(f => {
      const props = require(`./commands/${c}/${f}`);
      xtal.commands.set(props.help.name, props);
      xtal.categories.set(props.help.name, c);
      props.help.aliases.forEach(alias => {
        xtal.aliases.set(alias, props.help.name);
      });
  });
});
});

//Reload
xtal.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      const cat = xtal.categories.get(command);
      delete require.cache[require.resolve(`./commands/${cat}/${command}`)];
      const cmd = require(`./commands/${cat}/${command}`);
      xtal.commands.delete(command);
      xtal.aliases.forEach((cmd, alias) => {
        if (cmd === command) xtal.aliases.delete(alias);
      });
      xtal.commands.set(command, cmd);
      cmd.help.aliases.forEach(alias => {
        xtal.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//Commands
xtal.on("message", async message => {

  if (message.author.bot || !message.guild) return;

  let prefix = await db.fetch(`guildPrefix_${message.guild.id}`);
  if(prefix === null) prefix = 'x?';
  xtal.prefix = prefix;
  
  if (message.content.includes(message.mentions.users.first())) {
    xtal.afk.forEach(key => {
      if (key.id == message.mentions.users.first().id) {
        message.guild.fetchMember(key.id).then(member => {
          let user_tag = member.user.tag;
          return message.channel.send(`**${user_tag}** is currently afk. \nReason: **${key.reason}**`).then(msg => msg.delete(3000));
        });
      }
    });
  }

  xtal.afk.forEach(key => {
    if (message.author.id == key.id) {
      xtal.afk.delete(message.author.id);
      return message.reply(`You have been removed from the afk list!`).then(msg => msg.delete(3000));
    }
  });
  
  if (!levelcooldowns.has(message.guild.id)) {
    levelcooldowns.set(message.guild.id, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = levelcooldowns.get(message.guild.id);
  const cooldownAmount = (32) * 1000;
    if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) return;
  }
    const key = `${message.guild.id}-${message.author.id}`;
    xtal.levels.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
    });
    xtal.levels.inc(key, "points");
    let curLevel = Math.floor(0.1 * Math.sqrt(xtal.levels.get(key, "points")));
    if(xtal.levels.get(key, "level") < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      xtal.levels.set(key, curLevel, "level");
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (!levelcooldowns.has('globalPoints')) {
      levelcooldowns.set('globalPoints', new Discord.Collection());
    }
    const gnow = Date.now();
    const gtimestamps = levelcooldowns.get('globalPoints');
    const gcooldownAmount = (60) * 1000;
      if (gtimestamps.has('globalPoints')) {
      const gexpirationTime = timestamps.get('globalPoints') + gcooldownAmount;
      if (gnow < gexpirationTime) return;
    }
    const gkey = `globalPoints-${message.author.id}`;
    xtal.glevels.ensure(gkey, {
      user: message.author.id,
      points: 0,
      level: 1,
    });
    xtal.glevels.inc(gkey, "points");
    let gcurLevel = Math.floor(0.2 * Math.sqrt(xtal.glevels.get(gkey, "points")));
    if(xtal.glevels.get(gkey, "level") < gcurLevel) {
      let lvlmess = lvlrandom();
      let embedlvl = new Discord.RichEmbed()
      .setTitle(`You've leveled up to level **${gcurLevel}** Globally!`)
      .setDescription(`**${lvlmess}**`)
      .setColor(colors.cyan);
      message.reply(embedlvl);
      xtal.glevels.set(gkey, gcurLevel, "level");
    }
    gtimestamps.set(message.author.id, now);
    setTimeout(() => gtimestamps.delete(message.author.id), gcooldownAmount);
});

xtal.on('raw', packet => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = xtal.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
    channel.fetchMessage(packet.d.message_id).then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if (reaction) reaction.users.set(packet.d.user_id, xtal.users.get(packet.d.user_id));
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            xtal.emit('messageReactionAdd', reaction, xtal.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            xtal.emit('messageReactionRemove', reaction, xtal.users.get(packet.d.user_id));
        }
    });
});

function lvlrandom() {
  var rand = [
  "You realize that all your life you have been coasting along as if you were in a dream. Suddenly, facing the trials of the last few days, you have come alive.",
  "You realize that you are catching on to the secret of success. It's just a matter of concentration.",
  "You've done things the hard way. But without taking risks, taking responsibility for failure... how could you have understood?",
  "Everything you do is just a bit easier, more instinctive, more satisfying. It is as though you had suddenly developed keen senses and instincts.",
  "You've learned a lot about Cyrodiil... and about yourself. It's hard to believe how ignorant you were, but now you have so much more to learn.",
  "You resolve to continue pushing yourself. Perhaps there's more to you than you thought.",
  "The secret does seem to be hard work, yes, but it's also a kind of blind passion, an inspiration.",
  "So that's how it works. You plod along, putting one foot before the other, look up, and suddenly, there you are. Right where you wanted to be all along.",
  "You woke today with a new sense of purpose. You're no longer afraid of failure. Failure is just an opportunity to learn something new.",
  "Being smart doesn't hurt. And a little luck now and then is nice. But the key is patience and hard work.",
  "You can't believe how easy it is. You just have to go... a little crazy. And then, suddenly, it all makes sense, and everything you do turns to gold.",
  "It's the most amazing thing. Yesterday it was hard, and today it is easy. Just a good night's sleep, and yesterday's mysteries are today's masteries.",
  "Today you wake up, full of energy and ideas, and you know, somehow, that overnight everything has changed. What a difference a day makes.",
  "Now you just stay at your peak as long as you can. There's no one stronger in Tamriel, but there's always someone younger... a new challenger.",
  "You've been trying too hard, thinking too much. Relax. Trust your instincts. Just be yourself. Do the little things, and the big things take care of themselves.",
  "Life isn't over. You can still get smarter, or cleverer, or more experienced, or meaner... but your body and soul just aren't going to get any younger.",
  "With the life you've been living, the punishment your body has taken... there are limits, and maybe you've reached them. Is this what it's like to grow old?",
  "You're really good. Maybe the best. And that's why it's so hard to get better. But you just keep trying, because that's the way you are.",
  "By superhuman effort, you can avoid slipping backwards for a while. But one day, you'll lose a step, or drop a beat, or miss a detail... and you'll be gone forever.",
  "The results of hard work and dedication always look like luck. But you know you've earned every ounce of your success."
];
  return rand[Math.floor(Math.random()*rand.length)];
}

//Bot Credentials
xtal.login(process.env.TOKEN);


Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};