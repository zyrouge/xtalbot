const fetch = require('node-fetch');
const { RichEmbed } = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
  try {

    if (!args[0]) return message.reply('You need to input somthing to search!');
    let search = args[0];

    const package = await fetch(`https://registry.npmjs.com/${search}`).then(response => response.json());
      
    if(package.error) return message.reply('Package doesn\'t Exist.');

    let name = package.name;
    let version = package['dist-tags'].latest || "None Specified.";
    let pkg = package.versions[version];
    let author = pkg.author.name;
    let github = pkg.repository.url.slice(4, -4);
    let description = pkg.description;
    let license = package.license;
    let deps = Object.keys(pkg.dependencies).join(', ');

      let embed = new RichEmbed()
      .setColor(colors.black)
      .setTitle(name)
      .setThumbnail('https://i.imgur.com/8DKwbhj.png')
      .setDescription(description)
      .setFooter(xtal.user.username, xtal.user.avatarURL)
      .setURL(`https://npmjs.com/package/${name.toLowerCase()}`)
      .addField("Version", version)
      .addField(`Author`, author)
      .addField(`License`, license)
      .addField(`Dependencies`, deps)
      .addField(`Github Link`, github)
      .setTimestamp()
      .setImage(`https://nodei.co/npm/${package.name}.png`);

      message.channel.send(embed);

  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
}
  
};

exports.help = {
  name: "npm",
  aliases: []
};

exports.conf = {
  usage: "npm [package]",
  aliases: "None.",
  description: "NPM Command.",
  category: "Misc"
};