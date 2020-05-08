const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');
const config = require("../../config.json");

router.get("/", async (req, res) => {
    res.json({
        channels: req.xtal.channels.size,
        servers: req.xtal.guilds.size,
        users: req.xtal.users.size,
        ping: req.xtal.ping,
        os: process.platform,
        memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
      
    });
});

module.exports = router;