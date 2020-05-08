exports.run = (xtal, message, args) => {

  let reasons = [
    "Hi",
    "From the heart",
    "Just because",
    "Lol unban",
    "Just be unbanned"
  ];

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
    embed: {
      "description": "No Permissions!",
      "color": 0xff2222,
      "title": "Error"
    }
  });

  const reason = args.slice(1).join(' ');
  if (!reason) {
    reason = reasons[Math.floor(Math.random() * reasons.length)];
  }
  xtal.unbanReason = reason;
  const user = args[0] || message.mentions.members.first();

  if (!user) return message.reply({ embed: {"title": 'Mention a user!', "color": 0xff2222} });

  message.guild.unban(user);
  message.channel.send({
    embed: {
      "title": `Successfuly unbanned <@${user}>`,
      "description": "For reason: " + reason,
      "color": 0x22ff22
    }
  });
};

exports.help = {
  name: "unban",
  aliases: []
};

exports.conf = {
  usage: "unban [user] [reason]",
  aliases: "None.",
  description: "Unbans the User.",
  category: "Moderation"
};