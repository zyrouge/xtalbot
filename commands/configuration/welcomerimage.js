const db = require('quick.db');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
  
    let dbchannel = await db.fetch(`guildWelcome_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') return message.channel.send(`Welcomer Channel is not yet Set!`);

    if(args[0] && args[0].toLowerCase() == "disable") {

        await db.set(`guildWelcomeImage_${message.guild.id}`, 'disable');
        message.channel.send(`Welcomer Image has been **Disabled.**`);
        return;

    } else if (args[0] && args[0].toLowerCase() == "enable") {

        await db.set(`guildWelcomeImage_${message.guild.id}`, 'enable');
        message.channel.send(`Welcomer Image has been **Enabled.**`);
        return;

    } else {
      
        let fetched = await db.fetch(`guildWelcomeImage_${message.guild.id}`);
        if(fetched == null) fetched = 'disable';
        message.channel.send(`Welcomer Image in this server is **${fetched.charAt(0).toUpperCase() + fetched.substring(1) + "d"}.**`);
        return;
      
    }
};

exports.help = {
  name: "welcomerimage",
  aliases: ['welcomeimage']
};

exports.conf = {
  usage: "welcomerimage **or** welcomerimage [enable/disable]",
  aliases: "welcomeimage",
  description: "Shows/Sets the Welcomer Image.",
  category: "Configuration"
};