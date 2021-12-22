const { Client, Intents, Constants, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { clientId, guildId, token, welcomeChannel } = require('./auth.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

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
    options: [
      {
        name: 'num1',
        description: 'Le premier nombre',
        required: false,
        type: Constants.ApplicationCommandOptionTypes.NUMBER
      }
    ]
  })
})

client.on('messageCreate', async message => {
  if (message.content.startsWith('ha!selectrole')) {
    if(message.member.roles.cache.has('916318676108587069')){
      const SelectContryEmbed = new MessageEmbed()
      .setColor('#f33030')
      .setTitle('Choix de la langue !')
      .setDescription('Veuillez choisir votre langue pour accéder au discord!')
      .setThumbnail('https://cdn.discordapp.com/attachments/886347025887682590/915316202438557736/Heberg2.png')
      .addField('English', 'Please choose your language !', true)
      .addField('Español', '¡Elija su idioma!', true)
      .setTimestamp()
      .setFooter('HebergAll', 'https://cdn.discordapp.com/attachments/886347025887682590/915316202841178112/heberg4.png');
      const ChannelSelectLanguage = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Sélectionner une langue')
					.addOptions([
						{
							label: '🥖 | Français',
							description: 'Cliquez ici pour accéder au discord en français',
							value: 'select_fr',
						},
						{
							label: '🍵 | English',
							description: 'Click here to access the discord in English',
							value: 'select_en',
						},
            {
							label: '🥘 | Español',
							description: 'Haga clic aquí para acceder a Discord en español',
							value: 'select_es',
						},
					]),
			);
      message.channel.send({ embeds: [SelectContryEmbed], components: [ChannelSelectLanguage] }) 
    }
  }
  if (message.content === "ha!ticket"){
    const SelectContryEmbed = new MessageEmbed()
      .setColor('#f33030')
      .setTitle('🔖 Tickets !')
      .setDescription("Les tickets ont seulement pour but de contacter la modération, si vous avez une question concernant le discord, une demande particulière où un soucis vous pouvez l'utiliser.Veuillez à suivre les instructions demandées une fois le ticket ouvert. Il est parfois possible que personne ne soit là pour répondre directement.")
      .setThumbnail('https://cdn.discordapp.com/attachments/886347025887682590/915316202438557736/Heberg2.png')
      .setTimestamp()
      .setFooter('HebergAll', 'https://cdn.discordapp.com/attachments/886347025887682590/915316202841178112/heberg4.png');
      const TicketsButton = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('TicketsOuvrir')
					.setLabel('Ouvrir un ticket')
					.setStyle('SUCCESS'),
			);
    message.channel.send({ embeds: [SelectContryEmbed], components: [TicketsButton] })}
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()){
    return
  }

  const {commandName, options} = interaction

  if (commandName == 'ping') {
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
  }
})

client.on('interactionCreate', interaction => {
  if (!interaction.isSelectMenu()) return;
  if (interaction.values[0] == 'select_fr') {
    interaction.reply({ content: 'Vous avez choisi la langue française, bonne continuation à vous sur le serveur!', ephemeral: true});
    interaction.member.roles.add('916320792533430334')
  }else if (interaction.values[0] == 'select_en') {
    interaction.reply({ content: 'You have chosen the English language, good luck to you on the server!', ephemeral: true});
    interaction.member.roles.add('916321950865956894')
  } else if (interaction.values[0] == 'select_es') {
    interaction.reply({ content: 'Has elegido el idioma español, ¡buena suerte en el servidor!', ephemeral: true});
    interaction.member.roles.add('918110715280248833')
  }
});

client.on('interactionCreate', interaction => {
  if(!interaction.isButton()) return;
  console.log(interaction)
  if (interaction.values[0] == 'TicketsOuvrir'){
    message.guild.channels.create(`🔓-𝘛𝘪𝘤𝘬𝘦𝘵-${message.author.username}`, {
      parent: '916326736029966357',
      topic: `Ticket ouvert par ${message.author.username} (id de ${message.author.username}: ${message.author.id})`,
      permissionOverwrites: [{
          id: message.author.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: '918113015650480188',
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: message.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
      ],
      type: 'text',
    })
  }
})

/*Join*/
client.on('guildMemberAdd', guildMember => {
  const WelcomeEmbed = new MessageEmbed()
	.setColor('#f33030')
	.setTitle('Nouveau Membre !')
	.setDescription('Veuillez accueillir notre nouveau membre comme il se doit !')
	.setThumbnail('https://cdn.discordapp.com/attachments/886347025887682590/915316202438557736/Heberg2.png')
  .addField('\u200BBienvenue', `<@${guildMember.user.id}>`, true)
  .addField('Nous sommes désormais', `${guildMember.guild.memberCount} Membres`, true)
	.setTimestamp()
	.setFooter('HebergAll', 'https://cdn.discordapp.com/attachments/886347025887682590/915316202841178112/heberg4.png');
  guildMember.guild.channels.cache.get(welcomeChannel).send({ embeds: [WelcomeEmbed] });
  guildMember.roles.add('915420392196309022');
});

/*Quit*/
client.on('guildMemberRemove', guildMember => {
  const QuitEmbed = new MessageEmbed()
	.setColor('#f33030')
	.setTitle('Un membre en moins !')
	.setDescription('Nous avons perdus un membre !')
	.setThumbnail('https://cdn.discordapp.com/attachments/886347025887682590/915316202438557736/Heberg2.png')
  .addField('\u200BAu revoir', `<@${guildMember.user.id}>`, true)
  .addField('Nous sommes désormais', `${guildMember.guild.memberCount} Membres`, true)
	.setTimestamp()
	.setFooter('HebergAll', 'https://cdn.discordapp.com/attachments/886347025887682590/915316202841178112/heberg4.png');
  guildMember.guild.channels.cache.get('922942360944517140').send({ embeds: [QuitEmbed] });
});

client.login(token)