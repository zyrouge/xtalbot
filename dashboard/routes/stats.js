const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');
const config = require("../../config.json");
const moment = require("moment");
require("moment-duration-format");

router.get("/", CheckAuth, async (req, res) => {
    if(!req.user || !req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else {
        res.render("stats.ejs", {
            tag: (req.user ? req.user.tag : "Login"),
            xtal: req.xtal,
            invite: config.invite,
            connection: '100%',
            version: config.version,
            uptime: moment.duration(req.xtal.uptime).format(" D [days], H [hrs], m [mins], s [secs]")
        });
    }
});

module.exports = router;