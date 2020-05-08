module.exports = (xtal, guild) => {
  if(!guild) return;
  console.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  };