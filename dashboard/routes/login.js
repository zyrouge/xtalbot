const express = require("express");
const config = require("../../config");
const router = express.Router();
const CheckAuth = require("../auth/CheckAuth");
const passport = require("passport");
const Discord = require("discord.js");

// Gets login page
router.get("/", passport.authenticate("discord", { failureRedirect: config.weburl }), async function(req, res) {
    if(!req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else res.redirect("/me");
});

module.exports = router;