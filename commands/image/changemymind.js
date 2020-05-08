module.exports.run = async (xtal, message, args) => {
  
    const superagent = require('superagent');
    let txt = args.join(" ");

    if(!txt) return message.channel.send(`Incorrect Usage.`);
    
      superagent.get('https://nekobot.xyz/api/imagegen')
      .query({ type: 'changemymind', text: `${txt}`})
      .end((err, response) => {
      message.channel.send({ file: response.body.message });
      });
  
};

exports.help = {
  name: "changemymind",
  aliases: ['cmm']
};

exports.conf = {
  usage: "changemymind [text]",
  aliases: "cmm",
  description: "ChangeMyMind Command.",
  category: "Image"
};