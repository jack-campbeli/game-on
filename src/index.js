require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    // intents are a set of permissions that your bot needs to run
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions
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
        console.log("STARTED COLLECTING REACTIONS")
        const collectorFilter = (reaction) => ['👍', '👎'].includes(reaction.emoji.name);
        const collector = sentMessage.createReactionCollector({filter: collectorFilter, time: 10000});

        collector.on('collect', (reaction, user) => {
            console.log(`Collected reaction ${reaction.emoji.name} from ${user.tag}`);
        });

        // TESTING PURPOSES START
        sentMessage.react('👍');
        sentMessage.react('👎');
        // TESTING END

        collector.on('end', collected => {
            sendReactionCount(channel, collected)
        });

      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  /*
   * After the voting has ended, sendReactionCount() will count the
   * amount of thumbs-up and thumbs-down and return it.
   * 
   * TODO: check if each user only voted ONCE.
  */
  function sendReactionCount(channel, collected) {
    // console.log(collected)
    // console.log(`UNIQUE Reactions #: ${collected.size}`)

    let upCount = collected.get('👍').count
    let downCount = collected.get('👎').count

    channel.send(`HERE ARE THE RESULTS:`)
    channel.send(`Accepted: ${upCount}, Rejected: ${downCount}`)
  }
  

// do not push the token to github
client.login(process.env.TOKEN);