import dotenv from 'dotenv'
import fetch from 'node-fetch';
dotenv.config()

// Require the necessary discord.js classes
import {Client, GatewayIntentBits} from 'discord.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log('EHU Forum Creator bot')
    console.log('This bot is a member of the following servers:')
    const Guilds = client.guilds.cache.map(guild => "Guild ID: " + guild.id + ". Guild name: " + guild.name);
    console.log(Guilds);
})

client.on('ready', async () => {
    const guild = client.guilds.cache.get('878622701391081472');
    let newParent = 0;
    let channels = guild.channels.cache

    for(const[key, value] of channels) {
        if(value.parentId === "932239761760976966") { //Archive Year 1
            newParent = "1020048070727176303";
            await moveChannel(value, key, newParent);
            console.log("Moving channel: " + value.name + " to archive");

        } else if(value.parentId === "897770757885677578") { //Archive Year 2
            newParent = "1020048173730910338";
            await moveChannel(value, key, newParent);
            console.log("Moving channel: " + value.name + " to archive");

        } else if(value.parentId === "932239598430617630") { //Archive Year 3
            newParent = "1020048364231987260";
            await moveChannel(value, key, newParent);
            console.log("Moving channel: " + value.name + " to archive");

        } else if(value.parentId === "932238202482331688") { //Archive Year 4
            newParent = "1020048652019966173";
            await moveChannel(value, key, newParent);
            console.log("Moving channel: " + value.name + " to archive");
        }
    }
});

async function moveChannel(value, key, newParent) {
    await value.setParent(newParent);
}

client.login(process.env.TOKEN);