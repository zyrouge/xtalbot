exports.run = async (xtal, message, args, colors, emojis) => {
  
  message.channel.send("(╯°□°)╯  ︵  ┻━┻").then(m => {
        setTimeout(() => {
            m.edit("(╯°□°)╯    ]").then(ms => {
                setTimeout(() => {
                    ms.edit("(°-°)\\ ┬─┬")
                }, 500)
            })
        }, 500);

    });
  
};

exports.help = {
  name: "unflip",
  aliases: []
};

exports.conf = {
  usage: "unflip",
  aliases: "None.",
  description: "Unflip the Table.",
  category: "Text"
};