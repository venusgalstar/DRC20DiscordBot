require('dotenv').config();

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { Client, Intents, GatewayIntentBits } = require('discord.js');

const port = 5000;

const DISCORD_BOT_TOKEN = 'MTIwMzI3MzUwODM2OTYwNDY3MA.GJwfVe.zxHtGSjmGcmdBJEchCnwRKxG9GeGXzCa_EekGE';
const DISCORD_SUPCOINSERVER_ID = '1203274262199144499';

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages,
];
app.use(cors());
app.use(bodyParser.json());

// discord client start
const discordClient = new Client({ intents });
discordClient.login(DISCORD_BOT_TOKEN);
discordClient.on('ready', async () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('messageCreate', (message) => {
  console.log(message);
  // if (message.content.toLowerCase() === 'welcome') {
    message.reply('welcome');
  // }
});