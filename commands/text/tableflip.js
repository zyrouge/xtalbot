const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬'
];

exports.run = async (xtal, message, args, colors, emojis) => {
  
  const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
    for (const frame of frames) {
        setTimeout(() => {}, 4000);
        await msg.edit(frame);
    }
    return message;
  
};

exports.help = {
  name: "tableflip",
  aliases: ['tflip']
};

exports.conf = {
  usage: "tableflip",
  aliases: "tflip",
  description: "Flip the Table.",
  category: "Text"
};