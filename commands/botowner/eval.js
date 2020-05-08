exports.run = async (xtal, message, args, colors, emojis) => {
  
  const Discord = require("discord.js");
  const hastebin = require("hastebin-gen");
 
    const evalargs = message.content.split(" ").slice(1);    
    try {
      let code = evalargs.join(" ");
      let evaled = eval(code);
      let eargs = args.join(" ");
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
     if(clean(evaled).length < 1980) {
      const embed = new Discord.RichEmbed()
      .setTitle('Output 📤')
      .setDescription(` \`\`\`${clean(evaled)}\`\`\` `, {code:"xl"})
      .addField('Input 📥', ` \`\`\`${eargs}\`\`\` `)
      .setColor('#7CFC00');     
      message.channel.send(embed);
    } else {
      const haste = await hastebin(clean(evaled), { extension: "txt" });
      const embed = new Discord.RichEmbed()
      .setTitle('Output 📤')
      .setDescription(`[Click Me](${haste})`, {code:"xl"})
      .addField('Input 📥', ` \`\`\`${eargs}\`\`\` `)
      .setColor('#7CFC00');
      message.channel.send(embed);
    }
      
    } catch (err) {
 
      const eargs = args.join(" ");
      const errorembed = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setTitle('Error 🗳️')
      .addField('Output 📤', ` \`\`\`xl\n${clean(err)}\n\`\`\``)
      .addField('Input 📥', ` \`\`\`${eargs}\`\`\` `);     
      message.channel.send(errorembed)    
    }
  
};

exports.help = {
  name: "eval",
  aliases: ['ev']
};

exports.conf = {
  usage: "eval [script]",
  aliases: "ev",
  description: "Evaluates JavaScript Code.",
  category: "BotOwner"
};

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}