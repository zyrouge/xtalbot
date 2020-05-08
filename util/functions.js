const Discord = require("discord.js");
const fs = require("fs");
let colors = require("../colors.json");
const config = require("../config.json");
const db = require("quick.db");

module.exports = (xtal) => {

    xtal.regexEscape = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    xtal.emojiUrl = (emoji) => {
        let id = emoji.split(":")[2].split(">").join("");
        return xtal.emojis.get(id).url;
    };
  
};