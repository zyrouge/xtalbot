exports.run = async (xtal, message, args, colors, emojis) => {
  
    let kek = args[0];
    xtal.todoZY.ensure('todo', []);
    const todo = xtal.todoZY.get('todo');
    let i = 0;
    
    if(kek && kek == 'add') {
        let argsly = args.join(" ").split('add ').join("");
        if(!argsly) xtal.cmdErr(message, 'Incorrect Usage', this.help.name);
        todo.push(argsly);
        xtal.todoZY.set('todo', todo);
        message.channel.send(`**__Todo:__**\n${todo.map(x => ` ${++i}. ${x}`).join("\n") || 'None.'}`, {split: true});
        return;
    } else if(kek && kek == 'del') {
        let argsly = parseInt(args[1] - 1, 10);
        if(!argsly && isNaN(argsly)) return xtal.cmdErr(message, 'Incorrect Usage', this.help.name);
        todo.splice(argsly, 1);
        xtal.todoZY.set('todo', todo);
        message.channel.send(`**__Todo:__**\n${todo.map(x => ` ${++i}. ${x}`).join("\n") || 'None.'}`, {split: true});
        return;
    } else message.channel.send(`**__Todo:__**\n${todo.map(x => ` ${++i}. ${x}`).join("\n") || 'None.'}`, {split: true});
  
};

exports.help = {
  name: "todo",
  aliases: []
};

exports.conf = {
  description: "ToDo Command.",
  category: "BotOwner"
};