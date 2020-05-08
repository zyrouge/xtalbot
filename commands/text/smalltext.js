exports.run = async (xtal, message, args) => {
  
    const normal = ' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const wide =	' ⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖǫʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾǫᴿˢᵀᵁⱽᵂˣʸᶻ';
    let text = args.join(' ');
    if(!text) text = 'Provide some Text';
    for (let i = 0; i < normal.length; i++) {
			const char = normal[i];
			text = text.split(char).join(wide[i]);
		}
    message.channel.send(text);
  
};

exports.help = {
  name: "smalltext",
  aliases: ['smallify']
};

exports.conf = {
  usage: "smalltext [text]",
  description: "Smallifies the Text.",
  category: "Text"
};