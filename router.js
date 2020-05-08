const moment = require("moment");
require("moment-duration-format");
const { version } = require('./config.json');

module.exports = (app, xtal) => {
  
  app.use('/', require('./routes/index'));

  app.use('/authorize', require('./routes/discord'));

  app.get('/api/commands', (req, res) => {
    let cmdsarr = [];
    let cmds = xtal.commands.forEach(x => {
      const struct = {
        name: x.help.name,
        aliases: x.help.aliases,
        description: x.conf.description,
        guildOnly: x.conf.guildOnly,
        memberPermissions: x.conf.memberPermissions,
        botPermissions: x.conf.botPermissions,
        category: x.conf.category,
        examples: x.conf.examples,
        enabled: x.conf.enabled
      };
      cmdsarr.push(struct)
    });
    res.json(cmdsarr);
  });
  
  app.get('/api/stats', (req, res) => {
        switch(xtal.user.presence.game.type) {
            case 1: var gtype = "Playing"; break;
            case 2: var gtype = "Listening to"; break;
            case 3: var gtype = "Watching"; break;
  };
    res.json({
      tag: xtal.user.tag,
      id: xtal.user.id,
      ping: xtal.ping,
      pings: xtal.pings,
      guilds: xtal.guilds.size,
      channels: xtal.channels.size,
      commands: xtal.commands.size,
      voicechannels: xtal.voice.connections.size,
      uptime: xtal.uptime,
      version: version,
      status: `${xtal.user.presence.status.charAt(0).toUpperCase() + xtal.user.presence.status.substring(1)}`,
      game: `${gtype} ${xtal.user.presence.game.name}`
    });
  });
  
}