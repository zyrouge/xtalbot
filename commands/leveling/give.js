exports.run = async (xtal, message, args) => {
  
  if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");

  const user = message.mentions.users.first() || xtal.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");
  
  const key = `${message.guild.id}-${user.user.id}`;
  xtal.levels.ensure(key, {
      user: user.user.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
  });
  xtal.levels.inc(key, "points");
  let score = xtal.levels.get(key);

  const pointsToAdd = parseInt(args[1], 10);
  if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

  xtal.levels.ensure(key, {
      user: user.user.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
  });
  xtal.levels.inc(key, "points");
  let userscore = xtal.levels.get(key);
  userscore.points += pointsToAdd;

  let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
  userscore.level = userLevel;

  xtal.setScore.run(userscore);

  return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);

};

exports.help = {
  name: "givepoints",
  aliases: ['addpoints']
};

exports.conf = {
  usage: "givepoints @user [points]",
  aliases: "addpoints",
  description: "Edit User Points.",
  category: "Leveling"
};