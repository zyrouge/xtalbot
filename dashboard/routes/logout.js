const express = require("express");
const router = express.Router();

router.get("/", async function(req, res) {
    await req.logout();
    res.redirect('https://xtal.me');
});

module.exports = router;