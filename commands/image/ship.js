exports.run = async (xtal, message, args, colors) => {
  
  const { RichEmbed } = require("discord.js");
  let user1 = getUserFromMention(args[0]);
  let user2 = getUserFromMention(args[1]);
  
  function getUserFromMention(mention) {
    if (!mention) return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
  
      return xtal.users.get(mention);
    }
  }

  if(!user1 || !user2) return xtal.cmdErr(message, "Specify two Users.", this.help.name);
  let current = Math.floor(((Math.random() * 20) / 20) * 10)
  let all = 10;
  let sub = all - current;
  let barone = '';
  let bartwo = '';
  for(let i = 0; i < current;i++){
    barone += `:heartbeat:`
  }
  for(let j = 0; j < sub; j++){
    bartwo += `:broken_heart:`
  }
  let embed = new RichEmbed()
    .setAuthor(`${user1.tag} x ${user2.tag}`)
    .setDescription(`${barone}${bartwo}`)
    .setTimestamp()
    .setColor(colors.pink)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
  message.channel.send(embed);
  
};

exports.help = {
  name: "ship",
  aliases: []
};

exports.conf = {
  usage: "ship",
  description: "Ship?",
  category: "Image"
};
