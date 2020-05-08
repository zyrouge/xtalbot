const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');

router.get("/", CheckAuth, async (req, res) => {
    if(!req.user || !req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else {
    res.redirect("/me");
    }
});

module.exports = router;