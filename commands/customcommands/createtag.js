const Enmap = require('enmap');

exports.run = async (xtal, message, args, colors, emojis) => {
  
    xtal.tags = new Enmap({
        name: "tags",
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
      });

    try {
        let msg = await message.channel.send('Creating tag...');
        
        if (!args.join(' ').split('|')[0]) return message.reply('You have to name the tag!');
        if (!args.join(' ').split('|')[1]) return message.reply('You have to supply text for the tag!');
        if (args.join(' ').includes(".") || args.join(' ').includes("/") || args.join(' ').includes(",") || args.join(' ').includes("*")) return xtal.cmdErr(message, "Illegal Characters", "createtag");

        if (!xtal.tags.has(message.guild.id)) xtal.tags.set(message.guild.id, {});
        if (xtal.tags.has(message.guild.id, args.join(' ').split('|')[0])) return message.reply('That\'s already a tag!');
        
        xtal.tags.set(message.guild.id, {
          name: args.join(' ').split('|')[0],
          text: args.join(' ').split('|')[1]
        }, args.join(' ').split('|')[0]);
        
        msg.edit('Tag Created with the id of ' + message.id + '!');
      } catch (err) {
        message.channel.send('There was an error!\n' + err).catch();
    }
  
};

exports.help = {
  name: "createtag",
  aliases: ['createcommand', 'createcmd', 'ctag']
};

exports.conf = {
  usage: "createtag [name]|[text]",
  aliases: "createcommand, createcmd",
  description: "Creates a Tag.",
  category: "CustomCommands"
};