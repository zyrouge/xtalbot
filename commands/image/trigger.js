const memer = require("discordmeme.js");
const Discord = require("discord.js");

exports.run = async (xtal, message, args) => {
  
    let user = message.mentions.users.first() || message.author;
    const triggered = await triggeredGif(user.avatarURL)
    const attachment = new Discord.Attachment(triggered, 'triggered.gif');
    message.channel.send(attachment);
  
};

exports.help = {
  name: "trigger",
  aliases: []
};

exports.conf = {
  usage: "trigger @user",
  aliases: "None.",
  description: "Trigger a User.",
  category: "Image"
};

async function triggeredGif (buffer) {
  
    const GIFEncoder = require('gifencoder');
    const { createCanvas, Image, loadImage } = require("canvas");
  
    const WIDTH = 256
    const HEIGHT = 310

    const triggeredLabel = await loadImage('https://raw.githubusercontent.com/SwitchbladeBot/switchblade/dev/src/assets/png/triggered_label.png');
    const avatarImage = await loadImage(buffer);

    const encoder = new GIFEncoder(WIDTH, HEIGHT)
    encoder.start()
    encoder.setRepeat(0)
    encoder.setDelay(50)

    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext('2d')

    const BUFFER_RANDOM_MAX = 20
    const LABEL_RANDOM_MAX = 10
    const random = (max) => Math.floor(Math.random() * max) - max
    for (let i = 0; i < 8; i++) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      ctx.drawImage(avatarImage, random(BUFFER_RANDOM_MAX), random(BUFFER_RANDOM_MAX), WIDTH + BUFFER_RANDOM_MAX, HEIGHT - 54 + BUFFER_RANDOM_MAX)
      ctx.fillStyle = '#FF000033'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      ctx.drawImage(triggeredLabel, random(LABEL_RANDOM_MAX), HEIGHT - 54 + random(LABEL_RANDOM_MAX), 256 + LABEL_RANDOM_MAX, 54 + LABEL_RANDOM_MAX)
      encoder.addFrame(ctx)
    }

    encoder.finish()

    return encoder.out.getData()
  }