const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands dynamically
client.commands = new Collection();
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
  commands.push(command);
}

// Register commands on ready
client.once(Events.ClientReady, async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const guildId = 'YOUR_GUILD_ID'; // Optional: Only if using guild-specific
  const guild = client.guilds.cache.get(guildId);

  if (guild) {
    // Guild-specific commands (instant updates)
    await guild.commands.set(commands);
    console.log('📥 Registered commands for guild:', guildId);
  } else {
    // Global commands (can take up to 1 hour to appear)
    await client.application.commands.set(commands);
    console.log('🌍 Registered global commands');
  }
});

// Handle command interactions
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: '⚠️ There was an error executing that command.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);