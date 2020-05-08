exports.run = async (xtal, message, args, colors, emojis) => {

    let i = 0;
    let fields = [];
    let user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    let permissions = user.permissions;
    for (let permission in permissions) {
    fields.push(`${++i}. **${permission.replace(/_/g, ' ').replace(" ","").charAt(0).toUpperCase() + permission.replace(/_/g, ' ').replace(" ","").substring(1)}** - ${permissions[permission]}`);
    }

    message.channel.send(
`**__${user.user.tag} Permissions:__**
${fields.join("\n")}
`, {split: true})

};

exports.help = {
  name: "permissions",
  aliases: ['perms', 'myperms']
};

exports.conf = {
  usage: "permissions",
  description: "Displays all the User Permissios.",
  category: "Info"
};