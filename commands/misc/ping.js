exports.run = async (xtal, message, args, colors) => {

  var pings = xtal.pings;
  var total = 0;
  for(var i in pings) { total += pings[i]; }
  total = total / xtal.pings.length;
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Bot Latency is \`${m.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(xtal.ping)}ms\`. HeartBeat Latency is \`${Math.floor(total)}ms\`.`);

};

exports.help = {
  name: "ping",
  aliases: ['pong']
};

exports.conf = {
  usage: "ping",
  aliases: "pong",
  description: "Xtal Ping.",
  category: "Misc"
};