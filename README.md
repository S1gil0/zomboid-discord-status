# Project Zomboid Discord Status Bot

![Image](https://i.postimg.cc/mgrP2Bsy/5ggdgd.png)

## Description
Project Zomboid Discord Status Bot connects to a Project Zomboid server via RCON to display the number of players online as the bot's activity status.

## Setup
1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Configure the `.env` file with the following variables:
   - PZ_SERVER_IP=your_project_zomboid_server_ip
   - PZ_SERVER_PORT=your_project_zomboid_server_port
   - RCON_PASSWORD=your_rcon_password
   - DISCORD_BOT_TOKEN=your_discord_bot_token
4. Run the bot using `node bot.js`.

## Dependencies
- discord.js
- rcon-client
- dotenv

## Configuration
- This bot requires the following intent to be enabled in the Discord Developer Portal:
  - PRESENCE INTENT

## Usage
- The bot will update its activity status on Discord to show the number of players online on the Project Zomboid server.
- It will attempt to reconnect if disconnected from Discord.

## License
This project is licensed under the MIT License.
