const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');
const config = require("../../config.json");

router.get("/", CheckAuth, async (req, res) => {
    if(!req.user || !req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else {
        res.render("commands.ejs", {
            tag: (req.user ? req.user.tag : "Login"),
            user: req.user || null,
            xtal: req.xtal,
            size: req.xtal.commands.size,
            cmds: req.xtal.commands.map(x => `<font size="14"><b>x?${x.help.name}</font></b><br><font size="4">Aliases: ${x.help.aliases.length > 0 ? x.help.aliases.map(z => `x?${z}`).join(", ") : "None"}<br>Desc: ${x.conf.description}<br>Category: ${x.conf.category}<br>Usage: x?${x.conf.usage}</font>`).join("<hr>")
            //cmds: req.xtal.commands.map(x => `<b>${x.help.name}</b><br>Aliases: ${x.help.aliases.join(", ")}<br>Desc: ${x.conf.description}<br>Category: ${x.conf.category}<br>Usage: ${x.conf.usage}<br>Examples: ${x.conf.examples.length > 0 ? x.conf.examples.join(", ") : "None"}<br>Permissions: ${x.conf.memberPermissions.length > 0 ? x.conf.memberPermissions.join(", ") : "None"}<br>Guild Only: ${x.conf.guildOnly ? "Yes" : "No"}`).join("<hr>")
        });
    }
});

module.exports = router;