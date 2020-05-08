exports.run = async (xtal, message, args) => {
  
    const normal = ' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&()*+,-./:;<=>?@[\\]^_{|}~';
    const wide =	'　０１２３４５６７８９ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ！゛＃＄％＆（）＊＋、ー。／：；〈＝〉？＠［\\］＾＿｛｜｝～';
    let text = args.join(' ');
    if(!text) text = 'Provide some Text';
    for (let i = 0; i < normal.length; i++) {
			const char = normal[i];
			text = text.split(char).join(wide[i]);
		}
    message.channel.send(text);
  
};

exports.help = {
  name: "vaporwave",
  aliases: []
};

exports.conf = {
  usage: "vaporwave [text]",
  description: "Vaporwaves the Text.",
  category: "Text"
};