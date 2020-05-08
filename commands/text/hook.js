const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
 
    let text = args.join(" ") || "Specify some Text!"
    if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return xtal.xnoPerms(message, "MANAGE_WEBHOOKS");
    message.channel.createWebhook(message.author.username, message.author.displayAvatarURL)
    .then(async hook => {
      let webHook = new Discord.WebhookClient(hook.id, hook.token);
      webHook.send(text).then(() => {
      hook.delete('Message Has Been Send!');
      });
    })
    .catch(e => console.log(e.message));

};

exports.help = {
  name: "hook",
  aliases: []
};

exports.conf = {
  usage: "hook [text]",
  aliases: "None.",
  description: "Hooks yourself.",
  category: "Text"
};