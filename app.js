import dotenv from 'dotenv'
import fetch from 'node-fetch';
dotenv.config()

// Require the necessary discord.js classes
import {Client, GatewayIntentBits, resolveColor} from 'discord.js';

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
    const roles = guild.roles.cache;
    let parent = 0;

    const modules = [];
    //Narrow down the roles to modules only
    for(const [key, value] of roles) {
        if(value.color === 10181046 && value.name.startsWith('CIS4')) {
            modules.push(value);
        }
    }

    for(let i = 0; i < modules.length; i++) {
        if(modules[i].name.includes('CIS1')) {
            parent = "932239761760976966";
        } else if(modules[i].name.includes('CIS2')) {
            parent = "897770757885677578";
        } else if(modules[i].name.includes('CIS3')) {
            parent = "932239598430617630";
        } else {
            parent = "932238202482331688";
        }

        console.log("Creating channel for " + modules[i].name);
        await createChannel(modules, i, parent)

    }
});

async function createChannel(modules, i, parent) {
    const response = await fetch('https://discord.com/api/guilds/878622701391081472/channels', {
        method: 'POST',
        body: JSON.stringify({
            name: modules[i].name,
            type: 15,
            parent_id: parent,
            topic: "This is the forum for " + modules[i].name + ". Please use this channel to ask questions and discuss the module!",
            permission_overwrites: [
                {
                    "id": modules[i].id, //Allow module role
                    "type": "role",
                    "allow": 1024,
                    "deny": 0,
                    "allow_new": "1024",
                    "deny_new": "0"
                },
                {
                    "id": "878622701391081472", //Deny @everyone
                    "type": "role",
                    "allow": 0,
                    "deny": 1024,
                    "allow_new": "0",
                    "deny_new": "1024"
                }
            ],
            available_tags: [
                {
                    "name": "Assignments",
                    "emoji_name": "📖",
                    "moderated": false
                },
                {
                    "name": "Help & Advice",
                    "emoji_name": "❓",
                    "moderated": false
                },
                {
                    "name": "Looking for Group",
                    "emoji_name": "👥",
                    "moderated": false
                }
            ],
            default_reaction_emoji: {
                "emoji_id": null,
                "emoji_name": "👍"
            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bot ' + process.env.TOKEN
        }
    })
    const json = await response.json();
    console.log(json);
}

client.login(process.env.TOKEN);