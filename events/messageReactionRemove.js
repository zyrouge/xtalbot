const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");

module.exports = async (xtal, reaction, user) => {

  if (!user.guild) return;
  const message = reaction.message;
  let mod = await db.fetch(`guildLogs_${message.guild.id}`);
  if(mod == null || mod == 'None.') return;
  else {

  let channel = xtal.channels.get(mod);
  if(channel) {

  let embed = new Discord.RichEmbed()
  .setTitle('Reaction Removed')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`[Jump to Message](${message.url})`)
  .addField('Author', `${message.author.tag} | ${message.author.id}`)
  .addField(`Reaction Info`, `${reaction.emoji} | ${reaction.emoji.name || 'No Name'} | ${reaction.emoji.id || 'No ID'}`)
  .addField('Message Info', `${message.channel} | ${message.channel.name} | ${message.channel.id}`)
  .setColor(colors.purple)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)
    
  }};

  let fetchedstar = await db.fetch(`guildStarboard_${message.guild.id}`);
  if(fetchedstar !== null || fetchedstar !== 'None.') {

  const starChannel = xtal.channels.get(fetchedstar);
  if (!starChannel) return;
  if (message.author.id === user.id) return;
  if (reaction.emoji.name !== '⭐') return;
  const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
  const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
  if (stars) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
    const foundStar = stars.embeds[0];
    const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
    const embed = new Discord.RichEmbed()
    .setColor(foundStar.color)
    .setDescription(foundStar.description)
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setTimestamp()
    .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
    .setImage(image);
    const starMsg = await starChannel.fetchMessage(stars.id);
    await starMsg.edit({ embed });
    if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
    }
  }

  function extension(reaction, attachment) {
    const imageLink = attachment.split('.');
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return '';
    return attachment;
  };

};