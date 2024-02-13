require('dotenv').config();

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { Client, Intents, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');
const dotenv = require('dotenv')

const port = 5000;

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
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

discordClient.on('interactionCreate', async interaction => {
    // Check if the interaction is a slash command
    console.log(interaction);
    if (interaction.isCommand()) {
        // Check if the command name is 'dialog'
        if (interaction.commandName === 'dialog') {
            // Create a modal builder object
            const modal = new ModalBuilder()
                .setCustomId('myDialog')
                .setTitle('My Dialog');

            // Create text input components
            const nameInput = new TextInputBuilder()
                .setCustomId('nameInput')
                .setLabel('What is your name?')
                .setStyle(TextInputStyle.Short);

            const bioInput = new TextInputBuilder()
                .setCustomId('bioInput')
                .setLabel('Tell me something about yourself.')
                .setStyle(TextInputStyle.Paragraph);

            // Create action row components
            const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
            const secondActionRow = new ActionRowBuilder().addComponents(bioInput);

            // Add action rows to the modal
            modal.addComponents(firstActionRow, secondActionRow);

            // Show the modal to the user
            await interaction.showModal(modal);
        }
    }

    // Check if the interaction is a modal submission
    if (interaction.isModalSubmission()) {
        // Check if the modal custom id is 'myDialog'
        if (interaction.customId === 'myDialog') {
            // Get the user inputs from the modal
            const values = interaction.getValues();
            const name = values.nameInput;
            const bio = values.bioInput;

            // Process the user inputs in your bot logic
            // For example, send a message to the channel with the user inputs
            await interaction.channel.send(`Hello, ${name}! You said: ${bio}`);

            // Send a response to the user
            await interaction.update('Thank you for submitting the dialog.');
        }
    }
});

discordClient.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === 'welcome') {
    message.reply('welcome');
  }
});