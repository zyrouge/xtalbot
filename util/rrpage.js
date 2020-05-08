const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports = (xtal) => {

xtal.rrPage = async (message, _arr, _perpage = 30, _title = undefined, _color = colors.white) => {

    let first = 0;
    const perpage = _perpage;
    const msg = await message.channel.send({ embed: embedF(first) });
    const reaction1 = await msg.react('◀️');
    const reaction2 = await msg.react('▶️');
    const reaction3 = await msg.react('⏺️');
    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
        time: 60000
    });
    collector.on('collect', (r) => {
        let addcount = length(first + perpage);
        let remcount = length(first - perpage);
        if (r.emoji.name === '▶️') {
        if(addcount > 0) {
            r.remove(r.users.filter(u => u === message.author).first());
            first += perpage;
            msg.edit({ embed: embedF(first) });
        } else {
            r.remove(r.users.filter(u => u === message.author).first());
        }
        }
        else if (r.emoji.name === '◀️') {
        if(remcount > 0) {
            r.remove(r.users.filter(u => u === message.author).first());
            first -= perpage;
            msg.edit({ embed: embedF(first) });
        } else {
            r.remove(r.users.filter(u => u === message.author).first());
        }
        } else if (r.emoji.name === '⏺️')
        {
        collector.stop()
        }
    });

    collector.on('end', () => {
        msg.clearReactions();
    });

    /* Functions */
    function length(start) {
        let arr = _arr;
        arr = arr.slice(start, start + perpage);
        return arr.length;
    }

    function embedF(start) {
        let arr = _arr;
        arr = arr.slice(start, start + perpage);
        let totalpages = Math.ceil(_arr.length / perpage);
        let currentpages = Math.ceil(start / perpage) + 1;
        const embed = new Discord.RichEmbed()
        .setColor(colors.white)
        .setFooter(`Page: ${currentpages}/${totalpages} | ` + xtal.user.username ,`${xtal.user.avatarURL}`)
        .setTimestamp()
        .setDescription(arr.map((x) => ` \`-\` ${x}`).join("\n"));
        if(_title) embed.setTitle(_title)
        return embed;
    }

};

xtal.rrEmbed = async (message, _arr, _perpage = 30, _embed = undefined, _color = colors.white) => {

    let first = 0;
    const perpage = _perpage;
    const msg = await message.channel.send({ embed: embedF(first) });
    const reaction1 = await msg.react('◀️');
    const reaction2 = await msg.react('▶️');
    const reaction3 = await msg.react('⏺️');
    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
        time: 60000
    });
    collector.on('collect', (r) => {
        let addcount = length(first + perpage);
        let remcount = length(first - perpage);
        if (r.emoji.name === '▶️') {
        if(addcount > 0) {
            r.remove(r.users.filter(u => u === message.author).first());
            first += perpage;
            msg.edit({ embed: embedF(first) });
        } else {
            r.remove(r.users.filter(u => u === message.author).first());
        }
        }
        else if (r.emoji.name === '◀️') {
        if(remcount > 0) {
            r.remove(r.users.filter(u => u === message.author).first());
            first -= perpage;
            msg.edit({ embed: embedF(first) });
        } else {
            r.remove(r.users.filter(u => u === message.author).first());
        }
        } else if (r.emoji.name === '⏺️')
        {
        collector.stop()
        }
    });

    collector.on('end', () => {
        msg.clearReactions();
    });

    /* Functions */
    function length(start) {
        let arr = _arr;
        arr = arr.slice(start, start + perpage);
        return arr.length;
    }

    function embedF(start) {
        let arr = _arr;
        arr = arr.slice(start, start + perpage);
        let totalpages = Math.ceil(_arr.length / perpage);
        let currentpages = Math.ceil(start / perpage) + 1;
        if(!_embed) throw new Error(`No Embed was Provided!`);
        const embed = _embed
        .setFooter(`Page: ${currentpages}/${totalpages} | ` + xtal.user.username ,`${xtal.user.avatarURL}`)
        .setDescription(arr.map((x) => `${x}`).join("\n"));
        return embed;
    }

};

};