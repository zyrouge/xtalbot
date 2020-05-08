const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
    if (!args[0]) return message.reply('You need to input rock, paper, or scissors!');
    
    let choices = ['rock', 'paper', 'scissors'];
    if (!choices.includes(args[0].toLowerCase())) return message.reply('You need to choose rock, paper, or scissors!');
    
    let urps = args[0].toLowerCase();
    let brps = ch();
    let low;
    
    if (urps == brps) low = 'Tie!';
    if (urps == 'rock' && brps == 'paper' && !low) low = 'I Win!';
    if (urps == 'scissors' && brps == 'rock' && !low) low = 'I Win!';
    if (urps == 'paper' && brps == 'rock' && !low) low = 'You Win!';
    if (urps == 'rock' && brps == 'scissors' && !low) low = 'You Win!';
    if (urps == 'paper' && brps == 'scissors' && !low) low = 'I Win!';
    if (urps == 'scissors' && brps == 'paper' && !low) low = 'You Win!';

    let avatar;
    switch(low) {
        case 'I Win!': avatar = xtal.user.avatarURL; break;
        case 'You Win!': avatar = message.author.avatarURL; break;
        case 'Tie!': avatar = message.guild.iconURL; break;
    }

    let embed = new RichEmbed()
    .setAuthor(`Rock Paper Scissor!`)
    .addField(low, 'I choose ' + brps + ' and you choose ' + urps)
    .setTimestamp()
    .setColor(colors.black)
    .setThumbnail(avatar)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    
message.channel.send(embed);
  
};

exports.help = {
  name: "rps",
  aliases: []
};

exports.conf = {
  usage: "test",
  aliases: "None.",
  description: "Test Command.",
  category: "Games"
};

function ch() {
    var rand = ['rock', 'paper', 'scissors'];
    return rand[Math.floor(Math.random()*rand.length)];
}