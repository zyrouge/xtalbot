const Discord = require("discord.js");

exports.run = async (xtal, message, args, colors) => {
  
        const { createCanvas, loadImage } = require('canvas')
        const canvas = createCanvas(150, 50);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "#40e0d0";
        var key = "";
        for (var i = 0; i < 6; i++) {
            var rnd = Math.random();
            if (Math.round(rnd) == 0) {
                key += String.fromCharCode(48 + 9 * Math.random());
            } else {
                key += String.fromCharCode(65 + 25 * Math.random());
            }
        }

        ctx.clearRect(0, 0, 150, 50);
        ctx.fillRect(0, 0, 150, 50);
        ctx.font = "30px calibri";
        ctx.strokeText(key, 24, 34);

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png');
        const filter = response => {
            return response.content == key && response.author.id === message.author.id;
        };
	    message.reply(`You got **30** Seconds to Solve this.`, attachment).then((msg) => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct Captcha!`);
                })
                .catch(collected => {
                    message.channel.send('Captcha Unsuccessful.');
                });
        });
  
};

exports.help = {
  name: "gencaptcha",
  aliases: ['testcaptcha']
};

exports.conf = {
  usage: "gencaptcha",
  description: "Generates a Test Captcha.",
  category: "Verification"
};