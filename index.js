const { Client, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./auth.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });
const guild = client.guilds.cache.get(guildId)

let commands
if (guild) {
  commands = guild.commands
} else {
  commands = client.application?.commands
}

commands?.create({
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'number1',
        description: 'The first number.',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: 'number2',
        description: 'The second number.',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
})

// Listen for when the bot is ready
client.on('ready', () => {
    console.log('The bot is ready!')
  })
  // Listen for new messages
  client.on('messageCreate', (msg) => {
    // Was the message "ping"?
    if (msg.content === 'ping') {
      // Reply with "pong"
      msg.reply({
        content: 'pong',
      })
    }
})

client.login(token)