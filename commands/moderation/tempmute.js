const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (xtal, message, args) => {

  let tomute;
  if(message.mentions.members.first()) tomute = message.mentions.members.first()
  else if(args[0]) tomute = message.guild.members.find('name', args[0]) || message.guild.members.find('id', args[0]);
  
  if(!tomute) return message.reply("Couldn't find user.");
  if (tomute.id === message.author.id) {
    return xtal.cmdErr(message, 'You cannot do that to yourself.', 'mute');
  }
  if (tomute.highestRole.position >= message.member.highestRole.position) {
    return xtal.cmdErr(message, 'The targeted member has a higher or equal role position than you.', 'mute');
  }
  if (tomute.highestRole.position >= message.guild.me.highestRole.position) {
    return xtal.cmdErr(message, 'The targeted member has a higher or equal role position than me.', 'mute');
  }

  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[],
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  if (muterole.position >= message.guild.me.highestRole.position) {
    return xtal.cmdErr(message, 'The `Muted` Role is above my Role. Please correct it.', 'mute');
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for **${ms(ms(mutetime))}**`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been Unmuted!`);
  }, ms(mutetime));

};

exports.help = {
  name: "tempmute",
  aliases: ['tmute','mute']
};

exports.conf = {
  usage: "tempmute @user [1s/h/d]",
  aliases: "tmute, mute",
  description: "Mutes the User for the Specified Time.",
  category: "Moderation"
};