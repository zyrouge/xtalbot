module.exports = (xtal, guild) => {
  if(!guild) return;
  console.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
};