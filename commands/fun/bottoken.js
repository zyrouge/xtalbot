var api = require('some-random-api');

exports.run = async (xtal, message, args, colors, emojis) => {
  
    const m = await message.channel.send(`Generating Token...`)
    try {
    api.bottoken().then(tok => {
        m.edit(`**Bot Token:** \n\`\`\`` + tok + `\`\`\``);
    })
} catch (e) {
    console.log(e);
    m.edit(`Could not Generate Token...`);
}
  
};

exports.help = {
  name: "bottoken",
  aliases: ['token']
};

exports.conf = {
  usage: "bottoken",
  aliases: "token",
  description: "Shows the Bot Token.",
  category: "Fun"
};