const Enmap = require("enmap");
const db = require("quick.db");

exports.run = async (xtal, message, args, colors, emojis) => {

xtal.autoroles = new Enmap({ name: "autoroles", fetchAll: false, autoFetch: true, cloneLevel: 'deep'});

  try {
    let rolefind = args.join(" ");
    if (!rolefind) return xtal.cmdErr(message, "Mention a **Role Name/ID**.", 'addautoroles');
    xtal.autoroles.ensure(message.guild.id, []);
    let role = message.guild.roles.find(m => m.name.toLowerCase() === rolefind.toLowerCase()) || message.guild.roles.find(m => m.name.toLowerCase().includes(rolefind)) || message.guild.roles.find("id", rolefind);
    if(!role) return xtal.cmdErr(message, "Mentioned **Role** does not Exist.", 'addautoroles');
    if(role.position >= message.guild.me.highestRole.position || role.managed) return xtal.simpleEmbed(message, 'Mentioned Role is not **Managable** by Me.');
    if(xtal.autoroles.get(message.guild.id).includes(role.id)) return xtal.simpleEmbed(message, "Role already in **Autoroles**.");

    await xtal.autoroles.push(message.guild.id, role.id);

    xtal.simpleEmbed(message, `\`\`${role.name}\`\` has been added to **Autoroles**.`);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.help = {
  name: "addautoroles",
  aliases: ['addautorole']
};

exports.conf = {
  usage: "addautoroles [role name/id]",
  examples: ['addautoroles Members', 'addautoroles 742792738293'],
  description: "Assign a Role when the User joins the Guild.",
  category: "Configuration"
};