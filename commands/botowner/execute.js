const exec = require('child_process').exec;

exports.run = async (xtal, message, args, colors) => {
  
    try {
        const execute = (command) => {
    
          message.channel.send('Command Executed In Shell.');
          exec(command, (err, stdout, stderr) => {
            message.author.send(stdout).catch('The output was too big!');
            if (stderr) {
              message.author.send('```'+stderr+'```');
    
              message.channel.send('Shell Error.');
            }
          });
        }
    
        execute(args.join(' '));
      } catch (err) {
        message.channel.send('Their was an error!\n' + err).catch();
      }
      
};

exports.help = {
  name: "execute",
  aliases: ['exec']
};

exports.conf = {
  usage: "execute [text]",
  description: "Executes the Command in Console.",
  category: "BotOwner"
};