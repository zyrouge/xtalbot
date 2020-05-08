const Discord = require("discord.js");

module.exports = {

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    shuffle(pArray) {
        let array = [];
        pArray.forEach(element => array.push(element));
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

};