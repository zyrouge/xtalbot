exports.run = async (xtal, message, args) => {

  if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.reply('Missing the required `Move Members` permission.');

const member = message.mentions.members.first();
if (!member) return message.reply('You need to @mention a user/bot to kick from the voice channel.');
if (!member.voiceChannel) return message.reply('That user/bot isn\'t in a voice channel.');

member.setVoiceChannel(null);

message.react('👌');
  
};

exports.help = {
  name: "vckick",
  aliases: ['kickvc']
};

exports.conf = {
  usage: "vckick @user",
  aliases: "kickvc",
  description: "Kicks the User from the Voice Channel.",
  category: "Moderation"
};