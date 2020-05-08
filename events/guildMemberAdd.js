const db = require("quick.db");
const colors = require("../colors.json");
const Discord = require("discord.js");
const Enmap = require("enmap");

module.exports = async (xtal, member) => {

  let state = await db.fetch(`guildJoinLock_${member.guild.id}`);
  if(state == null) state = false;

  if(state) {
    member.kick(`Guild is Locked.`);
    let mod = await db.fetch(`guildLogs_${member.guild.id}`);
    if(mod !== null || mod !== 'None.') {
    if(xtal.channels.get(mod)) {
    let embed = new Discord.RichEmbed()
    .setTitle('Join Lock Kick')
    .setTimestamp()
    .setThumbnail(member.user.avatarURL)
    .addField('Name', member.user.username)
    .addField('ID', member.user.id)
    .setColor(colors.red)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    xtal.channels.get(mod).send(embed)
    }};
    return;
  }

  let blacks = await db.fetch(`guildBlackListed_${member.guild.id}`);
  if(blacks == null) blacks = [];
  if(blacks.length > 0 && blacks.includes(member.id)) {
    member.kick(`Blacklisted User.`);
    let mod = await db.fetch(`guildLogs_${member.guild.id}`);
    if(mod !== null || mod !== 'None.') {
    if(xtal.channels.get(mod)) {
    let embed = new Discord.RichEmbed()
    .setTitle('Blacklist User Kicked')
    .setTimestamp()
    .setThumbnail(member.user.avatarURL)
    .addField('Name', member.user.username)
    .addField('ID', member.user.id)
    .setColor(colors.red)
    .setFooter(xtal.user.username, xtal.user.avatarURL);
    xtal.channels.get(mod).send(embed)
    }};
    return;
  }

  if(!member.guild) return;
  const serverstats = new db.table('ServerStats');
  let sguildid = await serverstats.fetch(`Stats_${member.guild.id}`, { target: '.guildid' })
  let tusers = await serverstats.fetch(`Stats_${member.guild.id}`, { target: '.totusers' })
  let membs = await serverstats.fetch(`Stats_${member.guild.id}`, { target: '.membcount' })
  let bots = await serverstats.fetch(`Stats_${member.guild.id}`, { target: '.botcount' })
  
	const totalsize = member.guild.memberCount;
	const botsize = member.guild.members.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
  
  if(member.guild.id === sguildid) { 
		member.guild.channels.get(tusers).setName("Total Users : " + member.guild.memberCount);
		member.guild.channels.get(membs).setName("Human Users : " + humansize);
		member.guild.channels.get(bots).setName("Bot Users : " + member.guild.members.filter(m => m.user.bot).size);
	}

  let mod = await db.fetch(`guildLogs_${member.guild.id}`);
  if(mod !== null || mod !== 'None.') {
  
  let channel = xtal.channels.get(mod);
  if(channel) {
  
  let embed = new Discord.RichEmbed()
  .setTitle('Member Joined')
  .setTimestamp()
  .setThumbnail(member.user.avatarURL)
  .addField('Name', member.user.username)
  .addField('ID', member.user.id)
  .setColor(colors.green)
  .setFooter(xtal.user.username, xtal.user.avatarURL);
  
  channel.send(embed)
  }}

    xtal.autoroles = new Enmap({ name: "autoroles", fetchAll: false, autoFetch: true, cloneLevel: 'deep'});
    xtal.autoroles.ensure(member.guild.id, []);
    xtal.autoroles.get(member.guild.id).forEach(x => {
      if(member.guild.roles.get(x)) {
      if(member.guild.roles.get(x).position >= member.guild.me.highestRole.position || member.guild.roles.get(x).managed) return false;
      member.addRole(member.guild.roles.get(x));
      }
    });

    const defaulttxt = "**{{user}}**, Welcome to **{{server}}**";
    let fetchedwelcomechannel = await db.fetch(`guildWelcome_${member.guild.id}`);
    if(fetchedwelcomechannel !== null && fetchedwelcomechannel !== 'None.') {
      
    let channel = xtal.channels.get(fetchedwelcomechannel);
    if(channel) {
    let fetchedwelcomeMessage = await db.fetch(`guildWelcomeMessage_${member.guild.id}`);
    let welcomeMessage;
    if(fetchedwelcomeMessage !== null && fetchedwelcomeMessage !== 'None.') { welcomeMessage = fetchedwelcomeMessage }
    else { welcomeMessage = defaulttxt }
    
      welcomeMessage = welcomeMessage
                        .replace("{{user}}", member.user.tag)
                        .replace("{{mentionuser}}", member)
                        .replace("{{memcount}}", member.guild.memberCount)
                        .replace("{{server}}", member.guild.name);
      
      let fetchedimage = await db.fetch(`guildWelcomeImage_${member.guild.id}`);
      if(fetchedimage !== null || fetchedimage !== 'disable') {
        
        const Canvas = require('canvas');
        const canvas = Canvas.createCanvas(700, 250);
	      const ctx = canvas.getContext('2d');

	      const background = await Canvas.loadImage(image());
	      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	      ctx.strokeStyle = '#74037b';
	      ctx.strokeRect(0, 0, canvas.width, canvas.height);

	      ctx.font = 'italic 20px Arial';
	      ctx.fillStyle = '#ffffff';
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
	      ctx.fillText('Welcome', 255, 85);
  
        const welcometextPosition = {
          width: 255,
          height: 140,
        };
        
        let fontSize = 60;
        ctx.font = `bold italic  ${fontSize}px Arial`;
        
        /* Font Configs */
        do {
	        	ctx.font = `bold italic ${fontSize -= 1}px Arial`;
	      } while (ctx.measureText(`${member.user.username}#${member.user.discriminator}!`).width > 440 + 5);
        
        /* Username */
	      ctx.fillStyle = '#ffffff';
        ctx.textAlign = "start";
	      ctx.fillText(`${member.user.username}`, welcometextPosition.width, welcometextPosition.height, 455);
        
        /* Discrim */
	      ctx.fillStyle = '#84FFFF';
        ctx.textAlign = "start";
	      ctx.fillText(`#${member.user.discriminator}!`, ctx.measureText(`${member.user.username}`).width + welcometextPosition.width, welcometextPosition.height);

        ctx.shadowBlur = 0;
      	ctx.beginPath();
      	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      	ctx.closePath();
      	ctx.clip();

      	const avatar = await Canvas.loadImage(member.user.avatarURL);
      	ctx.drawImage(avatar, 25, 25, 200, 200);

      	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	      return channel.send(welcomeMessage, attachment);
        
      }
      
    return channel.send(welcomeMessage);
      
    }}
  
};

function image() {
  var rand = [
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fwelcomebg.png?v=1569925983227",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg1.png?v=1572140113409",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg2.png?v=1572140125473",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg3.png?v=1572140134721",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg4.png?v=1572140153983",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg5.png?v=1572140166278",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg6.png?v=1572140176930",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg7.png?v=1572140189524",
  "https://cdn.glitch.com/221a0af6-6816-4910-8a4a-306d1a40ec04%2Fbg8.png?v=1572140196558"
];
  return rand[Math.floor(Math.random()*rand.length)];
}