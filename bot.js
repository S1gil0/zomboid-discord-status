require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { Rcon } = require('rcon-client');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences]
});

const rcon = new Rcon({
    host: process.env.PZ_SERVER_IP,
    port: parseInt(process.env.PZ_SERVER_PORT),
    password: process.env.RCON_PASSWORD
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
        await rcon.connect();
        updatePlayerCount();
        setInterval(updatePlayerCount, 300000);
    } catch (error) {
        console.error('Failed to connect to RCON:', error);
    }
});

async function updatePlayerCount() {
    try {
        const response = await rcon.send('players');
        console.log("RCON Response:", response);
        const playerCountMatch = response.match(/\((\d+)\)/);
        if (playerCountMatch && playerCountMatch[1]) {
            const playerCount = playerCountMatch[1];
            console.log(`Setting activity to ${playerCount} players online`);
            await client.user.setPresence({
                activities: [{ name: `${playerCount} players online`, type: 3 }],
                status: 'online'
            });
        } else {
            throw new Error("Player count not found in RCON response.");
        }
    } catch (error) {
        console.error('Failed to fetch or parse player count:', error);
        await client.user.setPresence({
            activities: [{ name: 'Error fetching player count', type: 3 }],
            status: 'dnd'
        });
    }
}

client.on('disconnect', () => {
    console.log('Disconnected from Discord, attempting to reconnect...');
    client.login(process.env.DISCORD_BOT_TOKEN);
});

client.login(process.env.DISCORD_BOT_TOKEN);