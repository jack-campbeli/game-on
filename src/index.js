require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    // intents are a set of permissions that your bot needs to run
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.content === '👍') {
        message.reply('👍');
    }
});

// do not push the token to github
client.login(process.env.TOKEN);