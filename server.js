require('dotenv').config();
const dotenv = require('dotenv')
const crypto = require('crypto');

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

client.on('textChannelJoin', async message => {
  const button = new ButtonBuilder()
  .setCustomId('myButton')
  .setLabel('Click me')
  .setStyle(ButtonStyle.Primary);
  
  // Create an action row component
  const actionRow = new ActionRowBuilder().addComponents(button);
  
  // Send a message to the channel with the action row component
  await message.channel.send({ content: `Welcome ${message.author} to the text channel ${message.channel}`, components: [actionRow] });
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.displayName}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  console.log(message.author.username);

  const button = new ButtonBuilder()
  .setCustomId('verify')
  .setLabel('Verify User')
  .setStyle(ButtonStyle.Primary);
  
  // Create an action row component
  const actionRow = new ActionRowBuilder().addComponents(button);
  
  // Send a message to the channel with the action row component
  await message.channel.send({ content: `Welcome ${message.author} to the verify on ${message.channel}`, components: [actionRow] });

  //await message.reply('You are verified!');
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    console.log(interaction.user.username);
    const modal = new ModalBuilder()
      .setCustomId('verificationDlg')
      .setTitle('Verification');

    const randomBuffer = crypto.randomBytes(64);
    const randomString = randomBuffer.toString('hex');

    const codeInput = new TextInputBuilder()
      .setCustomId('codeInput')
      .setLabel('Verification code')
      .setValue(randomString)
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

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'verificationDlg') {
        const code = interaction.fields.getTextInputValue('codeInput');
        const hash = interaction.fields.getTextInputValue('hashInput');
        console.log(code, hash);
        await interaction.channel.send(`Hello, ${code}! You said: ${hash}`);
    }
  }
});

// Login to Discord with your app's token
client.login(DISCORD_TOKEN);
          