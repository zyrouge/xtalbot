exports.run = async (xtal, message, args) => {
  
  if(args[0] == "bots") {
    let amount;
    if(args[1]) amount = parseInt(args[1], 10);
    if(!args[1]) amount = 30;
    message.delete();
    await message.channel.fetchMessages({ limit: 100 }).then(messages => {
    const botMessages = messages.filter(msg => msg.author.bot)
    message.channel.bulkDelete(botMessages)})
  return;
};

if(message.mentions.users.first()) {
  let msg = message;
  var usr = msg.mentions.users.first();
  if(args.join(" ").slice(22)) var amt = parseInt(args.join(" ").slice(22), 10);
  if(!args.join(" ").slice(22)) var amt = 30;
        if (!amt) {
            msg.channel.send("Please provide a number between 2 and 100 for the number of messages to delete.").catch(console.error);
        } else {
            message.delete();
            await msg.channel.fetchMessages({limit: 100})
                .then ((messages) => {
                    var filterUser = usr.id;
                    var filtered = messages.filter(m => m.author.id === filterUser).array().slice(0, amt);      
                    msg.channel.bulkDelete(filtered)
                }).catch(console.error);
        }
return;
};

      let deleteCount = parseInt(args[0], 10);
      let realcount = ++deleteCount;
      if(!deleteCount || deleteCount < 2 || deleteCount > 98)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
  
    const fetched = await message.channel.fetchMessages({limit: realcount})
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    
  };

exports.help = {
  name: "purge",
  aliases: ['clear', 'p']
};

exports.conf = {
  usage: "purge [amount]",
  aliases: "clear",
  memberPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES"],
  description: "Purges the Amount of Message.",
  category: "Moderation"
};