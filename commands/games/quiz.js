const { RichEmbed } = require("discord.js");
const fetch = require('node-fetch');

exports.run = async (xtal, message, args, colors, emojis) => {

  const data = await fetch(`https://opentdb.com/api.php?amount=1&type=boolean&encode=url3986`).then(response => response.json());
  if(data.response_code !== 0) return xtal.simpleEmbed(message, `Cannot generate a Trivia.`);
  const question = decodeURIComponent(data.results[0].question);
  const catgory = decodeURIComponent(data.results[0].category);
  const difficulty = decodeURIComponent(data.results[0].difficulty);
  const answer = decodeURIComponent(data.results[0].correct_answer);
  let answers = data.results[0].incorrect_answers.map(x => decodeURIComponent(x));
  answers.push(answer);
  shuffle(answers);
  shuffle(answers);
  shuffle(answers);
  let embed = new RichEmbed()
  .setAuthor(`Quiz`, message.author.avatarURL)
  .addField(`Question`, `${question}`)
  .addField(`Choices`, `${answers.map((x, i) => `${++i}. **${x.charAt(0).toUpperCase() + x.substring(1)}**`).join("\n")}`)
  .addField(`Category`, `${catgory}`, true)
  .addField(`Difficulty`, `${difficulty.charAt(0).toUpperCase() + difficulty.substring(1)}`, true)
  .setTimestamp()
  .setColor(colors.white)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  message.channel.send(embed)
  const trivia = message.channel.createMessageCollector(msg => msg.author.id === message.author.id, { maxMatches: 1, time: 10 * 1000 });
  trivia.on('collect', ans => {
    let color, description;
    if (ans.content.toLowerCase() === answer.toLowerCase() || parseInt(ans.content) === answers.findIndex(x => x === answer) + 1) {
      xtal.simpleEmbed(message, `${ans.author}, Absolutely! You got **10** Crystals.`);
      add(xtal, message);
    } else {
      xtal.simpleEmbed(message, `${ans.author}, Try Again. Answer: **${answer.charAt(0).toUpperCase() + answer.substring(1)}**`);
    }
  });

  trivia.on('end', (answers, reason) => {
    if (reason === 'time') {
      xtal.simpleEmbed(message, `${message.author}, Timeout!, Try Again. Answer: **${answer.charAt(0).toUpperCase() + answer.substring(1)}**`);
  }});
};

exports.help = {
  name: "quiz",
  aliases: ['trivia']
};

exports.conf = {
  usage: "quiz",
  description: "A Interesting Quiz.",
  category: "Games"
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function add(xtal, message) {
  xtal.eco.set(`eco_${message.author.id}`, 10);

}