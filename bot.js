const Discord = require("discord.js");
const auth = require("./auth.json");

const client = new Discord.Client();

// Reaction numbers as Unicode, reacting with them normally doesn't work
var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"];

client.on("ready", () => {
       console.log("I am ready!");
});

// Triggered when message is sent in server
client.on("message", (message) => {

	// Prevent loop from bots own messages
        if(message.author.bot) return;

	// Get command and its arguments
        const args = message.content.slice(1).trim().split(" ");
        const command = args.shift().toLowerCase();

	// Creating a raid
	if(command === "r"){
                const boss = args[0];
                const time = args[1];
                let gym = "";
                let i;
                for(i = 2; i < args.length; i++){
                        gym = gym + args[i] + " ";
                }
                const msg = "```Boss: " + boss + "\nTime: " + time + "\nLocation: " + gym + "\n-------------------------\nIlmoittautuneet: \nYhteensä: 0```";
                message.delete().catch(O_o=>{});
                message.channel.send(msg)
			.then(function(message){
	                        message.react(reaction_numbers[1]);
	                        message.react(reaction_numbers[2]);
	                        message.react(reaction_numbers[3]);
			});
	}

	// PingPong!
        if (command === "ping") {
                message.channel.send("pong!`" + (new Date().getTime() - message.createdTimestamp) + "ms`");
        }
});

client.on("messageReactionAdd", (reaction, user) => {

	if(user.bot) return;
	if(reaction.message.author.id !== "437713794576285696") return;
	let newMessageContent = "";
	let msgParts = reaction.message.content.split("Ilmoittautuneet:");

	// -6, so we don't count bot's own reactions!
	let playerCount = -6;
	let users = new Map();

	for (var [key, value] of reaction.message.reactions) {
		if(key === reaction_numbers[3]){
			playerCount += value.count * 3;
		} else if(key === reaction_numbers[2]){
			playerCount += value.count * 2;
		} else if(key === reaction_numbers[1]){
			playerCount += value.count;
		}

		for (var [ukey, uvalue] of value.users) {
			if(!users.has(ukey)){
				users.set(ukey, uvalue)
			}
		}
	}

	let usernamelist = "";
	for (var [key, value] of users) {
		if(key !== "437713794576285696") {
			usernamelist += value.username + "\n";
		}
	}
	newMessageContent = msgParts[0] + "Ilmoittautuneet:\n" + usernamelist + "\nYhteensä: " + playerCount + "```";

	reaction.message.edit(newMessageContent);

});

client.on("messageReactionRemove", (reaction, user) => {

        if(user.bot) return;

        let newMessageContent = "";
        let msgParts = reaction.message.content.split("Ilmoittautuneet:");

	// -6, so we don't count bot's own reactions!
        let playerCount = -6;
	let users = new Map();

	for (var [key, value] of reaction.message.reactions) {
		if(key === reaction_numbers[3]){
			playerCount += value.count * 3;
		} else if(key === reaction_numbers[2]){
			playerCount += value.count * 2;
		} else if(key === reaction_numbers[1]){
			playerCount += value.count;
		}

		for (var [ukey, uvalue] of value.users) {
			if(!users.has(ukey)){
				users.set(ukey, uvalue);
			}
		}
	}
	let usernamelist = "";
	for (var [key, value] of users) {
		if(key !== "437713794576285696") {
			usernamelist += value.username + "\n";
		}
	}
	newMessageContent = msgParts[0] + "Ilmoittautuneet:\n" + usernamelist + "\nYhteensä: " + playerCount + "```";

	reaction.message.edit(newMessageContent);

});



client.login(auth.token);
