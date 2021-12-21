const { Client, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./auth.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log('Le bot est en ligne')

  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guildId) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  commands?.create({
    name: 'ping',
    description: "Réponds pong",
  })
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()){
    return
  }

  const {commandName, options} = interaction

  if (commandName == 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true, 
    })
  }
})

client.login(token)