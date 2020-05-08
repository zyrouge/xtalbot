exports.run = async (xtal, message, args) => {
  
    let text = args.join(' ');
    if(!text) text = 'Provide some Text';
    const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
    const offset = '!'.charCodeAt(0);
    message.channel.send(text.split('').map(c => c.charCodeAt(0) - offset).map(c => mapping[c] || ' ').reverse().join(''));
  
};

exports.help = {
  name: "flip",
  aliases: ['fliptext']
};

exports.conf = {
  usage: "flip [text]",
  description: "Flips the Text.",
  category: "Text"
};