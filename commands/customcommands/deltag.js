const Enmap = require('enmap');

exports.run = async (xtal, message, args, colors, emojis) => {

    xtal.tags = new Enmap({
        name: "tags",
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
      });
    
      try {
        let msg = await message.channel.send('Deleting tag...');
        if (!args[0]) return message.reply('You have to supply the name of the tag!');
        
        if (!xtal.tags.has(message.guild.id)) xtal.tags.set(message.guild.id, {});
        if (!xtal.tags.has(message.guild.id, args.join(' '))) return message.reply('That\'s not a valid tag!');
        
        xtal.tags.delete(message.guild.id, args.join(' '));
        
        msg.edit('Tag deleted with the ID of ' + message.id + '!');
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "removetag",
  aliases: ['deltag', 'deletecommand', 'delcmd', 'delcmd', 'delcommand']
};

exports.conf = {
  usage: "removetag [tag]",
  aliases: "deltag, deletecommand, delcmd, delcmd, delcommand",
  description: "Deletes a Tag.",
  category: "CustomCommands"
};