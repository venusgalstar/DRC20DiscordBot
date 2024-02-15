require('dotenv').config();
const dotenv = require('dotenv')
const crypto = require('crypto');
const axios = require('axios');

const { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events, ModalBuilder, EmbedBuilder, MessageButton , TextInputBuilder, TextInputStyle  } = require('discord.js');

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN;

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.displayName}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  await axios.post("https://thedragontest.com/discord/verified", {username:message.author.username}).then(async response => {
    let verified = response.data.verified;
    if(!verified)
    {
      const verifyButton = new ButtonBuilder()
      .setCustomId('verify')
      .setLabel('Verify User')
      .setStyle(ButtonStyle.Primary);

      const randomBuffer = crypto.randomBytes(64);
      const randomString = randomBuffer.toString('hex');

      await axios.post("https://thedragontest.com/discord/set_code", {username:message.author.username, code:randomString});

      const gotoButton = new ButtonBuilder()
      .setLabel('Sign Data')
      .setStyle(ButtonStyle.Link)
      .setURL("https://thedragontest.com?code=" + randomString);

      const actionRow = new ActionRowBuilder().addComponents(gotoButton, verifyButton);
      
      await message.channel.send({ content: `Welcome ${message.author} to verify on ${message.channel}`, components: [actionRow] });
    }
  })
  .catch(error => {
    console.error(error);
  });
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    //console.log(interaction.user.username);
    if(interaction.customId === "verify")
    {
      const modal = new ModalBuilder()
        .setCustomId('verificationDlg')
        .setTitle('Verification');

      let code = '';
      await axios.post("https://thedragontest.com/discord/code", {username:interaction.user.username}).then(async response => {
        code = response.data.code;
      });
      
      const codeInput = new TextInputBuilder()
        .setCustomId('codeInput')
        .setLabel('Verification code')
        .setValue(code)
        .setStyle(TextInputStyle.Short);

      const hashInput = new TextInputBuilder()
        .setCustomId('hashInput')
        .setLabel('Hashcode signed by your wallet')
        .setStyle(TextInputStyle.Paragraph);

      // Create action row components
      const firstActionRow = new ActionRowBuilder().addComponents(codeInput);
      const secondActionRow = new ActionRowBuilder().addComponents(hashInput);

      // Add action rows to the modal
      modal.addComponents(firstActionRow, secondActionRow);

      // Show the modal to the user
      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'verificationDlg') {
        const code = interaction.fields.getTextInputValue('codeInput');
        const hash = interaction.fields.getTextInputValue('hashInput');
        console.log(interaction.user.username, code, hash);
        await interaction.channel.send(`Hello, ${code}! You said: ${hash}`);
    }
  }
});

// Login to Discord with your app's token
client.login(DISCORD_TOKEN);
          