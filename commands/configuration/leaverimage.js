const db = require('quick.db');

exports.run = async (xtal, message, args) => {

    if(!message.member.hasPermission(['MANAGE_GUILD', 'ADMINISTRATOR'])) return xtal.noPerms(message, 'MANAGE_GUILD, ADMINISTRATOR');
  
    let dbchannel = await db.fetch(`guildLeave_${message.guild.id}`);
    if(dbchannel == null || dbchannel == 'None.') return message.channel.send(`Leaver Channel is not yet Set!`);

    if(args[0] && args[0].toLowerCase() == "disable") {

        await db.set(`guildLeaveImage_${message.guild.id}`, 'disable');
        message.channel.send(`Leaver Image has been **Disabled.**`);
        return;

    } else if (args[0] && args[0].toLowerCase() == "enable") {

        await db.set(`guildLeaveImage_${message.guild.id}`, 'enable');
        message.channel.send(`Leaver Image has been **Enabled.**`);
        return;

    } else {
      
        let fetched = await db.fetch(`guildLeaveImage_${message.guild.id}`, 'enable');
        if(fetched == null) fetched = 'disable';
        message.channel.send(`Leaver Image in this server is **${fetched.charAt(0).toUpperCase() + fetched.substring(1) + "d"}.**`);
        return;
      
    }
};

exports.help = {
  name: "leaverimage",
  aliases: ['leaveimage']
};

exports.conf = {
  usage: "leaverimage **or** leaverimage [enable/disable]",
  aliases: "leaveimage",
  description: "Shows/Sets the Leaver Image.",
  category: "Configuration"
};