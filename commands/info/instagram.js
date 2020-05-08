const instagram = require("user-instagram");
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors, emojis) => {

    if(!args.join(" ")) return xtal.cmdErr(message, `No Username was Provided!`, this.help.name);
    const m = await message.channel.send(`Searching for \` ${args.join(" ")} \``);
    instagram(`https://www.instagram.com/${args.join(" ")}`)
    .then(async data => {
      if(!data.fullName) {
        m.delete();
        xtal.simpleEmbed(message, `No results for \` ${args.join(" ")} \``);
        return;
      }
      let embed = new RichEmbed()
      .setTitle(data.fullName + " [" + data.id + "]")
      .setURL(data.profileLink)
      .setThumbnail(data.avatarHD)
      .setDescription(data.bio)
      .addField(`Username`, `\`\` `+ data.username + ` \`\``, true)
      .addField(`Followers`, data.subscriberCount, true)
      .addField(`Following`, data.subscribtions, true)
      .addField(`Posts`, data.postCount, true)
      .addField(`Private`, data.isPrivate ? "Yes" : "No", true)
      .addField(`Verified`, data.isVerified ? "Yes" : "No", true)
      m.edit(embed);
    })
    .catch(e => {
      xtal.simpleEmbed(message, `No results for \` ${args.join(" ")} \``);
      m.delete();
      console.log(e)
    });
  
};

exports.help = {
  name: "instagram",
  aliases: []
};

exports.conf = {
  usage: "instagram [username]",
  description: "Displays the Instagram Profile.",
  category: "Info"
};