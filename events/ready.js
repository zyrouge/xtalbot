module.exports = (xtal, message) => {
  const config = require("../config.json")
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./scores.sqlite');
  const Discord = require("discord.js");
  const moment = require("moment");
  const wait = require('util').promisify(setTimeout);
  const text = `Tag: ${xtal.user.tag}\nID: ${xtal.user.id}\nGuilds: ${xtal.guilds.size} Guilds`;
  xtal.logger.log(`Successful!`, "ready")
  console.log(text);
  xtal.user.setStatus('idle');
  xtal.user.setActivity(`${config.web} | v${config.version} | Zyrouge Development`, {type: 'LISTENING'});
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) { sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
                            sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
                            sql.pragma("synchronous = 1");
                            sql.pragma("journal_mode = wal"); }
  xtal.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  xtal.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
  const giveaways = require("discord-giveaways");
  giveaways.launch(xtal, {
    updateCountdownEvery: 30000,
    botsCanWin: false,
    embedColor: "#7289DA",
    reaction: "🎉",
    storage: __dirname+"/giveaways.json"
});
const dash = require("../dashboard/app");
dash.load(xtal);
};