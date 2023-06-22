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
    // console.log(message.content);
    if (message.content === 'create-event') {
        
        message.reply('Enter Date: (e.g., YYYY-MM-DD)');

        const filter = (msg) => msg.author.id === message.author.id;
        const DATE__collector = message.channel.createMessageCollector({ filter, max: 1 });

        DATE__collector.on('collect', (msg) => {
            const date = msg.content;
            console.log('Event date:', date);
        
            message.reply('Enter Time: (e.g., HH:MM)');
            const TIME_collector = message.channel.createMessageCollector({ filter, max: 1 });

            TIME_collector.on('collect', (msg) => {
                const time = msg.content;
                console.log('Event time:', time);

                message.reply('Enter Title:');
                const TITLE_collector = message.channel.createMessageCollector({ filter, max: 1 });

                TITLE_collector.on('collect', (msg) => {
                    const title = msg.content;
                    console.log('Event title:', title);

                    message.reply('Enter Description:');
                    const DESCRIPTION_collector = message.channel.createMessageCollector({ filter, max: 1 });

                    DESCRIPTION_collector.on('collect', (msg) => {
                        const description = msg.content;
                        console.log('Event description:', description);

                        message.reply('Enter Location:');
                        const LOCATION__collector = message.channel.createMessageCollector({ filter, max: 1 });

                        LOCATION__collector.on('collect', (msg) => {
                            const location = msg.content;
                            console.log('Event location:', location);

                            message.reply('Enter Deadline:');
                            const DEADLINE__collector = message.channel.createMessageCollector({ filter, max: 1 });

                            DEADLINE__collector.on('collect', (msg) => {
                                const deadline = msg.content;
                                console.log('Event deadline:', deadline);

                                // REPLY AND REACT 
                                sendEventMessage(msg.channel, title, description, location, date, time, deadline);
                            });
                        });
                    });
                });
            });
        });
    }
});

function sendEventMessage(channel, title, description, location, date, time, deadline) {
    channel.send(`
      Title: ${title}\nDescription: ${description}\nLocation: ${location}\nDate: ${date}\nTime: ${time}\nDeadline: ${deadline}
    `)
      .then((sentMessage) => {
        sentMessage.react('👍');
        sentMessage.react('👎');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  

// do not push the token to github
client.login(process.env.TOKEN);