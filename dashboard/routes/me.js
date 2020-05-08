const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');
const config = require("../../config.json");

router.get("/", CheckAuth, async (req, res) => {
    if(!req.user || !req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else {
        res.render("me.ejs", {
            tag: (req.user ? req.user.tag : "Login"),
            xtal: req.xtal,
            user: req.user || null,
            invite: config.invite,
            guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
            avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
            iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
        }).catch(e => {
          res.render("404.ejs");
        });
    }
});

module.exports = router;