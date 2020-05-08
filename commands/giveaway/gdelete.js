const Discord = require("discord.js");
const giveaways = require("discord-giveaways");
const ms = require("ms");

exports.run = async (xtal, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      ":x: You don't have `MANAGE_GUILD` permission to use this command."
    );
  if (!args[0]) return message.reply("Correct usage: `greroll [giveawayid]`.");
  let messageID = args[0];
  giveaways
    .delete(messageID)
    .then(() => {
      message.channel.send("Success! Giveaway deleted!");
    })
    .catch(err => {
      message.channel.send(
        "No giveaway found for **" + messageID + "**, please check and try again"
      );
    });
  message.delete();
};

exports.help = {
  name: "gdelete",
  aliases: ["giveawaydelete"]
};

exports.conf = {
  usage: "gdelete [message id]",
  description: "Reroll a Giveaway.",
  category: "Giveaway"
};
