const Discord = require("discord.js");
const giveaways = require("discord-giveaways");
const ms = require("ms");

exports.run = async (xtal, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      ":x: You don't have `MANAGE_GUILD` permission to use this command."
    );
  if (!args[0] || !args[1] || !args[2] || !args.slice(2).join(" "))
    return message.reply("Incorrect usage.");

  let messageID = args[0];
  let thatgiveaway = giveaways
    .fetch()
    .filter(g => g.guildID === message.guild.id)
    .filter(g => !g.ended)
    .filter(m => m.messageID === messageID);
  if (thatgiveaway.length == 0 && thatgiveaway.length < 2)
    return xtal.simpleEmbed(
      message,
      `No Giveaway found with ID: **${messageID}**`
    );

  if (args[1] == "time") {
    const addi = parseInt(args[2]);
    if (!addi || isNaN(addi))
      return xtal.cmdErr(message, "Incorrect usage.", this.help.name);
    const prize = thatgiveaway[0].prize;
    const winners = thatgiveaway[0].winnersCount;
    giveaways
      .edit(messageID, {
        newWinnersCount: parseInt(winners),
        newPrize: prize,
        addTime: addi * 1000
      })
      .then(() => {
        message.channel.send("Success! Giveaway updated!");
      })
      .catch(err => {
        message.channel.send(
          "No giveaway found for " + messageID + ", please check and try again"
        );
      });
  } else if (args[1] == "prize") {
    const addi = args.slice(2).join(" ");
    if (!addi)
      return xtal.cmdErr(message, "Incorrect usage.", this.help.name);
    const winners = thatgiveaway[0].winnersCount;
    giveaways
      .edit(messageID, {
        newWinnersCount: parseInt(winners),
        newPrize: addi,
        addTime: 0
      })
      .then(() => {
        message.channel.send("Success! Giveaway updated!");
      })
      .catch(err => {
        message.channel.send(
          "No giveaway found for " + messageID + ", please check and try again"
        );
      });
  } else if (args[1] == "winners") {
    const addi = parseInt(args[2]);
    if (!addi || isNaN(addi))
      return xtal.cmdErr(message, "Incorrect usage.", this.help.name);
    const prize = thatgiveaway[0].prize;
    giveaways
      .edit(messageID, {
        newWinnersCount: parseInt(addi),
        newPrize: prize,
        addTime: 0
      })
      .then(() => {
        message.channel.send("Success! Giveaway updated!");
      })
      .catch(err => {
        message.channel.send(
          "No giveaway found for " + messageID + ", please check and try again"
        );
      });
  }

  message.delete();
};

exports.help = {
  name: "gedit",
  aliases: ["giveawayedit"]
};

exports.conf = {
  usage: "gedit [message id] [time/prize/winners] [time_to_add/new_prize/winner_count]",
  description: "Edit a Giveaway.",
  category: "Giveaway"
};
