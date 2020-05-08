const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');
const config = require("../../config.json");

router.get("/404", CheckAuth, async (req, res) => {
    if(!req.user || !req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else {
        res.render("404.ejs");
    }
});

module.exports = router;