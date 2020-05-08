const config = require("../config.json");
const Discord = require("discord.js");

module.exports.load = async (xtal) => {

    const express = require("express");
    const bodyparser = require("body-parser");
    const session = require("express-session");
    const path = require("path");
    const app = express();
    const passport = require("passport");
    const { Strategy } = require("passport-discord");
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.engine("html", require("ejs").renderFile);
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "/static")))
    app.set('views', path.join(__dirname, "/views"))
    app.use(session({
        secret: "Xtal",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(async function(req, res, next){
        req.xtal = xtal;
        next();
    })
    let port = require('../config.json').port || 3000;
    app.set('port', port);
  
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(new Strategy({
        clientID:       xtal.user.id,
        clientSecret:   config.clientSecret,
        callbackURL:    config.weburl + '/login',
        scope:          [ "identify", "guilds" ]
    }, function (accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            return done(null, profile);
        });
    }));

    app.use("/login", require('./routes/login'));
    app.use("/logout", require('./routes/logout'))
    app.use("/me", require('./routes/me'));
    app.use("/stats", require('./routes/stats'));
    app.use("/commands", require('./routes/commands'));
    app.use("/manage", require('./routes/manage'));
    app.use("/oops", require('./routes/oops'));
    app.use("/api", require('./routes/api'));
    app.get('/ping', (req, res) => res.send('Online ;)') );
    app.use("/", require('./routes/index'));
    app.get("*", function(req, res) {
        res.redirect("/oops/404");
    });

    app.listen(app.get("port"), (err) => {
        console.log("Dashboard: Listening on port " + app.get("port"));
    });

}