const calculate = require('mathjs');
const { RichEmbed } = require('discord.js');

exports.run = async (xtal, message, args, colors) => {
  
    let eq = args.join(' ');
    if(message.content.includes('÷')) return message.channel.send('Use `/` instead of `÷`.');
    if(!eq) return message.channel.send(`Please provide an equation to Solve.`);
    try {
    let math = await calculate.eval(eq);
    let embed = new RichEmbed()
    .setAuthor('Math Equations', message.author.avatarURL)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL)
    .addField(`Question`, `\`\`\`js\n${args.join('')}\`\`\``)
    .addField(`Answer`, `\`\`\`js\n${math}\`\`\``);
    message.channel.send(embed);
    } catch(e) {
      return message.channel.send('Provide an valid equation')
    }
  
};

exports.help = {
  name: "calculate",
  aliases: ['cal', 'calc']
};

exports.conf = {
  usage: "calculate",
  aliases: "cal, calc",
  description: "Solve an Equation.",
  category: "Utility"
};