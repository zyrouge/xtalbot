const faces = ['(*^ω^)', '(◕‿◕✿)', '(◕ᴥ◕)', 'ʕ•ᴥ•ʔ', 'ʕ￫ᴥ￩ʔ', '(*^.^*)', 'owo', '(｡♥‿♥｡)', 'uwu', '(*￣з￣)', '>w<', '^w^', '(つ✧ω✧)つ', '(/ =ω=)/'];

const owofy = (string) => {
  let i = Math.floor(Math.random() * faces.length);
    
  string = string.replace(/(tseries|t-series)/, 'badseries');
  string = string.replace(/(?:l|r)/g, 'w');
  string = string.replace(/(?:L|R)/g, 'W');
  string = string.replace(/n([aeiou])/g, 'ny$1');
  string = string.replace(/N([aeiou])/g, 'Ny$1');
  string = string.replace(/N([AEIOU])/g, 'Ny$1');
  string = string.replace(/ove/g, 'uv');
  string = string.replace(/!+/g, ` ${faces[i]} `);

  return string;
};

exports.run = async (xtal, message, args, colors, emojis) => {
  
    try {
        if (!args[0]) {
          message.channel.send('You must provide a message to OwOify!');
        } else message.channel.send(owofy(args.join(' ')));
      } catch (err) {
        message.channel.send('Their was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "owo",
  aliases: ['0w0', 'owoify', 'owotext']
};

exports.conf = {
  usage: "owo [text]",
  aliases: "0w0, owoify, owotext",
  description: "OwOify your Text.",
  cateText: "Text"
};