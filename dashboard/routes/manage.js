const express = require("express");
const config = require("../../config");
const router = express.Router();
const CheckAuth = require("../auth/CheckAuth");
const passport = require("passport");
const Discord = require("discord.js");
const db = require('quick.db');

router.get("/:guildID", CheckAuth, async (req, res) => {
    let server = req.xtal.guilds.get(req.params.guildID);
    if (!server && req.user.guilds.filter(u => ((u.permissions & 2146958591) === 2146958591)).map(u => u.id).includes(req.params.guildID)) {
      return res.redirect(config.invite + `&guild_id=` + req.params.guildID);
    } else if (!server) {
      return res.redirect(`/me`);
    };
    if(!req.xtal.guilds.get(req.params.guildID).members.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/me");
    let prefix = await db.fetch(`guildPrefix_${server.id}`);
    if(!prefix || prefix == null) prefix = 'x?';
    let modonly = await db.fetch(`guildModOnly_${server.id}`);
    if(!modonly || modonly == null) modonly = false;
    let modonlyrole = await db.fetch(`guildModOnlyRole_${server.id}`);
    if(!modonlyrole || modonlyrole == null) modonlyrole = false;
    let modonlyperm = await db.fetch(`guildModOnlyPerm_${server.id}`);
    if(!modonlyperm || modonlyperm == null) modonlyperm = false;
    let allmodperms = ["KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_MESSAGES", "MANAGE_ROLES"];

    let settings = {
        prefix: prefix,
        modonly: modonly,
        modonlyrole: modonlyrole,
        modonlyperm: modonlyperm,
        allmodperms: allmodperms
    };
    res.render("manage.ejs", {
        tag: (req.user ? req.user.tag : "Login"),
        xtal: req.xtal,
        user: req.user,
        avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        guild: server,
        settings: settings
      });
});

 router.post("/:guildID", CheckAuth, async function(req, res) { 
    let server = req.xtal.guilds.get(req.params.guildID);
    if (!server) return res.redirect(`/me`);
    if(!req.xtal.guilds.get(req.params.guildID).members.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect("/me");

    let data = req.body;

    /* Prefix */
    if(data.hasOwnProperty("prefix")) {
        let newprefix;
        let prefix = await db.fetch(`guildPrefix_${server.id}`);
        if(!prefix || prefix == null) prefix = 'x?';
        if(data.prefix.length > 0) newprefix = data.prefix;
        if(newprefix) await db.set(`guildPrefix_${server.id}`, newprefix);
    }

    /* Nickname */
    if(data.hasOwnProperty("nick")) {
        let nick;
        if(data.nick.length > 0) nick = data.nick;
        if(nick) server.me.setNickname(nick);
    }

    /* Mod Only */
    if(data.hasOwnProperty("modonly")) {
        if(data.modonly && data.modonly === "on") await db.set(`guildModOnly_${server.id}`, true);
    } else await db.set(`guildModOnly_${server.id}`, false);
    
    /* Mod Only Roles */
    if(data.hasOwnProperty("modonlyrole")) {
        let role = server.roles.find((role) => role.name === data.modonlyrole) ? server.roles.find((role) => role.name === data.modonlyrole).id : undefined;
        if(role) await db.set(`guildModOnlyRole_${server.id}`, role);
        else await db.delete(`guildModOnlyRole_${server.id}`);
    }

    /* Mod Only Perms */
    if(data.hasOwnProperty("modonlyperm")) {
        let allmodperms = ["KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_MESSAGES", "MANAGE_ROLES"];
        if(data.modonlyperm && allmodperms.includes(data.modonlyperm)) await db.set(`guildModOnlyPerm_${server.id}`, data.modonlyperm);
        else await db.delete(`guildModOnlyPerm_${server.id}`);
    }

    /* Redirect */
    await res.redirect(`/manage/${req.params.guildID}`);
    });

module.exports = router;