const discord = require('discord.js');

exports.run = async (xtal, message, args) => {

const mapping = {
    ' ': '   ',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '0': ':zero:',
    '!': ':gray_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:',
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

    if (args.length < 1) {
        message.channel.send('❌ Provide Sometion to Emojify');
    }

    message.channel.send(
        args.join(' ')
            .split('')
            .map(c => mapping[c] || c)
            .join('')
    );

};


exports.help = {
    name: 'emojify',
    aliases: ['emolets']
};

exports.conf = {
    usage: "emojify [text]",
    aliases: "emolets",
    description: "Convert Text to Emojis.",
    category: "Text"
};