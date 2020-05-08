const Enmap = require('enmap');

exports.run = async (xtal, message, args, colors, emojis) => {

    xtal.tags = new Enmap({
        name: "tags",
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
      });
    
    try {
        let msg = await message.channel.send('Editing tag...');
        
        if (!args.join(' ').split('|')[0]) return message.reply('You have to name the tag!');
        if (!args.join(' ').split('|')[1]) return message.reply('You have to supply text for the tag!');
        
        if (!xtal.tags.has(message.guild.id)) xtal.tags.set(message.guild.id, {});
        if (!xtal.tags.has(message.guild.id, args.join(' ').split('|')[0])) return message.reply('Thats not a tag!');
        xtal.tags.set(message.guild.id, {
          name: args.join(' ').split('|')[0],
          text: args.join(' ').split('|')[1]
        }, args.join(' ').split(' | ')[0]);
        
        msg.edit('Tag Edited with the id of ' + message.id + '!');
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "edittag",
  aliases: ['editcmd', 'editcommand']
};

exports.conf = {
  usage: "edittag [tag]|[text]",
  aliases: "editcmd, editcommand",
  description: "Edit a Tag.",
  category: "CustomCommands"
};