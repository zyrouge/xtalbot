exports.run = async (xtal, message, args) => {
  var user = message.mentions.members.first(); //User
  var roleName = args.splice(2).join(' ');
  var role = message.guild.roles.find(m => m.name.toLowerCase() === roleName.toLowerCase()) || message.guild.roles.find(m => m.name.toLowerCase().includes(roleName)) //Role Search
  var errors = [
    "Something went wrong."
  ];

  var userErr = [
    "Specify a User."
  ];

  var roleErr = [
    "Specify a Role."
  ];

  var already = [
    "The User already has that Role."
  ];
  var alreadyNo = [
    "The User already doesn\'t have that Role."
  ];

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have Permissions.")

  switch (args[0]) {
    case 'add':
      if (!user) return message.reply(userErr[Math.floor((Math.random() * userErr.length))]); // I need User
      if (!roleName) return message.reply(roleErr[Math.floor((Math.random() * roleErr.length))]); //I need roleName
      if (role == null) role = message.mentions.roles.first();
      if (role == null) return message.reply("Can\'t find that Role...");
      if (user.roles.has(role.id)) return message.reply(already[Math.floor((Math.random() * already.length))]); //Already have role

      user.addRole(role).then(() => message.reply('Role Given. :ok_hand:')).catch((err) => message.reply(errors[Math.floor((Math.random() * errors.length))]).then(() => console.log(err)));
      break;
    case 'remove':
      if (!user) return message.reply(userErr[Math.floor((Math.random() * userErr.length))]); // I need User
      if (!roleName) return message.reply(roleErr[Math.floor((Math.random() * roleErr.length))]); //I need roleName
      if (role == null) role = message.mentions.roles.first();
      if (role == null) return message.reply("Can\'t find that Role...");
      if (!user.roles.has(role.id)) return message.reply(alreadyNo[Math.floor((Math.random() * alreadyNo.length))]);

      user.removeRole(role).then(() => message.reply('Role Removed. :ok_hand:')).catch((err) => message.reply(errors[Math.floor((Math.random() * errors.length))]).then(() => console.log(err)));
      break;
    default:
      message.channel.send({
        embed: {
          "description": 'Improper Usage. \`b!role <add>|<remove> <user> <role>\`',
          "color": 0xff2222
        }
      });
  }
};

exports.help = {
  name: "role",
  aliases: []
};

exports.conf = {
  usage: "role [add/remove] @user [role]",
  aliases: "None.",
  description: "Role Management.",
  category: "Managing"
};

/*case 'all':
      var rolename = args.splice(1).join(" ");
      var RoLe = message.guild.roles.find(m => m.name.toLowerCase() === rolename.toLowerCase())
      if(!RoLe) return xtal.cmdErr(message, "Role Not Found!", this.help.name);
      if (RoLe.position >= message.guild.me.highestRole.position) return xtal.cmdErr(message, "Role higher than Me!", this.help.name);
      message.guild.members.forEach(m => {
      setTimeout(() => {
        m.addRole(RoLe);
      } , 5000)
      });
      xtal.simpleEmbed(message, `Adding ${RoLe} to **All**. [This may take a While]`)
      break;
    case 'humans':
      var ROLEname = args.splice(1).join(" ");
      var ROLE = message.guild.roles.find(m => m.name.toLowerCase() === ROLEname.toLowerCase())
      if(!ROLE) return xtal.cmdErr(message, "Role Not Found!", this.help.name);
      if (ROLE.position >= message.guild.me.highestRole.position) return xtal.cmdErr(message, "Role higher than Me!", this.help.name);
      message.guild.members.filter(x => x.user.bot !== true).forEach(m => {
      setTimeout(() => {
        m.addRole(ROLE);
      } , 5000)
      });
      xtal.simpleEmbed(message, `Adding ${ROLE} to **Humans**. [This may take a While]`)
      break;
    case 'bots':
      var roleNAME = args.splice(1).join(" ");
      var ROle = message.guild.roles.find(m => m.name.toLowerCase() === roleNAME.toLowerCase())
      if(!ROle) return xtal.cmdErr(message, "Role Not Found!", this.help.name);
      if (ROle.position >= message.guild.me.highestRole.position) return xtal.cmdErr(message, "Role higher than Me!", this.help.name);
      message.guild.members.filter(x => x.user.bot === true).forEach(m => {
      setTimeout(() => {
        m.addRole(ROle);
      } , 5000)
      });
      xtal.simpleEmbed(message, `Adding ${ROle} to **Bots**. [This may take a While]`)
      break;*/