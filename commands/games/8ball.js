const { RichEmbed } = require("discord.js");

exports.run = (xtal, message, args, colors) => {
   
  let qa = args.join(" ");
  if(!qa) return message.channel.send("8Ball searches for the Question and gets Lost...");
    
  let embed = new RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTimestamp()
  .setColor(colors.white)
  .addField(`Question`, qa)
  .addField(`🎱 8Ball Says`, eball())
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  message.channel.send(embed);
};

exports.help = {
  name: "8ball",
  aliases: ["eightball"]
}

exports.conf = {
  usage: "8ball [question]",
  aliases: "eightball",
  description: "Roll the 8Ball to check your Question.",
  category: "Games"
};

function eball() {
  var rand = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes, definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
  'Yes!',
  'No.',
  'Why are you even trying?',
  'What do you think? NO',
  'Maybe',
  'Never',
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  'Don\'t count on it.',
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.',
  'No way.',
  'Maybe',
  'The answer is hiding inside you',
  'No.',
  'Depends on the mood of the CS god',
  'Hang on',
  'It\'s over',
  'It\'s just the beginning',
  'Good Luck'];
  return rand[Math.floor(Math.random()*rand.length)];
}