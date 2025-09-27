// 🔐 Ładowanie zmiennych środowiskowych
require('dotenv').config();

const mongoose = require('mongoose');
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');

// 🔗 Połączenie z MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Połączono z MongoDB');
}).catch((err) => {
  console.error('❌ Błąd połączenia z MongoDB:', err);
});

// 🔧 Inicjalizacja klienta Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🔹 Inicjalizacja CAPTCHA
try {
  const { initCaptcha } = require('./utils/captcha');
  initCaptcha(client);
} catch (err) {
  console.warn('⚠️ CAPTCHA nie została załadowana:', err.message);
}

// 📁 Ładowanie eventów
try {
  const eventsPath = path.join(__dirname, 'events');
  fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`./events/${file}`);
    const handler = (...args) => event.execute(...args);
    event.once ? client.once(event.name, handler) : client.on(event.name, handler);
  });
  console.log('📂 Eventy załadowane');
} catch (err) {
  console.warn('⚠️ Błąd ładowania eventów:', err.message);
}

// 📁 Ładowanie komend
client.commands = new Map();
try {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  });
  console.log('📂 Komendy załadowane');
} catch (err) {
  console.warn('⚠️ Błąd ładowania komend:', err.message);
}

// 📡 Obsługa interakcji slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(`❌ Błąd w poleceniu ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania polecenia.', ephemeral: true });
  }
});

// ✅ Logowanie bota
client.once('ready', () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

// 🌐 Express serwer do pingowania przez AllStack
const app = express();
app.get('/', (req, res) => {
  console.log(`🔁 Ping: ${new Date().toISOString()}`);
  res.send('Bot działa poprawnie');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🌐 Serwer Express działa na porcie ${port}`));
