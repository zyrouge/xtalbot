const Enmap = require("enmap");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

xtal.autoroles = new Enmap({ name: "autoroles", fetchAll: false, autoFetch: true, cloneLevel: 'deep'});

  try {
    let rolefind = args.join(" ");
    if (!rolefind) return xtal.simpleEmbed(message, "Mention a **Role Name/ID**.");
    xtal.autoroles.ensure(message.guild.id, []);
    let role = message.guild.roles.find(m => m.name.toLowerCase() === rolefind.toLowerCase()) || message.guild.roles.find(m => m.name.toLowerCase().includes(rolefind)) || message.guild.roles.find("id", rolefind);
    if(!role) return xtal.simpleEmbed(message, "Mentioned **Role** does not Exist.")
    if (!xtal.autoroles.get(message.guild.id).includes(role.id)) return xtal.simpleEmbed(message, "Role already not in **Autoroles**.");

    await xtal.autoroles.remove(message.guild.id, role.id);

    xtal.simpleEmbed(message, `\`\`${role.name}\`\` has been removed from **Autoroles**.`);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.help = {
  name: "removeautoroles",
  aliases: ['removeautorole']
};

exports.conf = {
  usage: "removeautoroles [role name/id]",
  examples: ['removeautoroles Members', 'removeautoroles 742792738293'],
  description: "Removes the Role from AutoRoles.",
  category: "Configuration"
};