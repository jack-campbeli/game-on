const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    // intents are a set of permissions that your bot needs to run
    intents: [
        IntentsBitField.Flags.GUILDS,
        IntentsBitField.Flags.GUILD_MEMBERS,
        IntentsBitField.Flags.GUILD_MESSAGES,
        IntentsBitField.Flags.GUILD_MESSAGES
    ]
});

// do not push the token to github
client.login("token-here");