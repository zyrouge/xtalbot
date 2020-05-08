const cathyjs = require("../../util/chat");
const chatbot = require("../../util/chat.js");

exports.run = async (xtal, message, args, colors, emojis) => {
  
let text = args.join(" ");
if(!text) return message.reply('Specify some text');
message.channel.startTyping();    
message.reply(await chatbot(text, message.author.username));
message.channel.stopTyping();
  
};

exports.help = {
  name: "chatbot",
  aliases: ['chat', 'cb']
};

exports.conf = {
  usage: "chatbot [text]",
  aliases: "chat, cb",
  description: "Chat with Xtal.",
  category: "Misc"
};