const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

exports.run = async (xtal, message, args, colors) => {

    if(!message.channel.nsfw) return message.channel.send(`❌ It is not a NSFW Channel!`);
                               
    const { KSoftClient } = require('ksoft.js');
    const ksoft = new KSoftClient(process.env.KSOFT);
    let { url, post: { title, subreddit, link, upvotes, downvotes } } = await ksoft.images.reddit('ass', { removeNSFW: false, span: 'week' });

    let embed = new Discord.RichEmbed()
    .setAuthor(`${title}`, message.author.avatarURL)
    .setDescription(`[${subreddit}](${link}) | 👍 **${upvotes}** | 👎 **${downvotes}**`)
    .setTimestamp()
    .setImage(url)
    .setColor(colors.white)
    .setFooter(xtal.user.username, xtal.user.avatarURL);

    message.channel.send(embed);

};

exports.help = {
    name: 'ass',
    aliases: ['thicc']
};

exports.conf = {
    usage: "ass",
    aliases: "None",
    description: "Sends an Ass Picture.",
    category: "NSFW"
};