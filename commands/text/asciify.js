const ascii = require('ascii-art-font')

exports.run = (xtal, message, args) => {

    ascii.font(args.join(' '), 'Doom', function(rendered) {
        rendered = rendered.trimRight();
        if (rendered.length > 2000) return message.channel.send('❌ Sorry! The message is too Long!');
        message.channel.send(rendered, {
            code: 'md'
        });
    });
};

exports.help = {
    name: 'asciify',
    aliases: ['ascii']
};

exports.conf = {
    usage: "asciify [text]",
    aliases: "ascii",
    description: "Convert to ASCII Text.",
    category: "Text"
};