const leet = (string) => {
  string = string.replace(/l|i/gi, '1');
  string = string.replace(/z/gi, '2');
  string = string.replace(/e/gi, '3');
  string = string.replace(/a/gi, '4');
  string = string.replace(/s/gi, '5');
  string = string.replace(/G/g, '6');
  string = string.replace(/t/gi, '7');
  string = string.replace(/b/gi, '8');
  string = string.replace(/g/g, '9');
  string = string.replace(/o/gi, '0');

  return string;
};

exports.run = async (xtal, message, args) => {
  
    try {
        let text = args.join(" ");
        if (!text)  text = "Provide some Text.";
        message.channel.send(leet(text));
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
      }
    
};
  
exports.help = {
    name: "leet",
    aliases: ['leetify']
};
  
exports.conf = {
    usage: "leet [text]",
    description: "Leetify the Text.",
    category: "Text"
};