import { Events } from 'discord.js';

import { Client } from './client/Client';

import { config } from './env';

const client = new Client({
  intents: ['GuildMessages'],
});

if (!client) {
  throw new Error('Client cannot be created');
}

client.once(Events.ClientReady, () => {
  console.log('Client ready');
});

client.loadCommands().catch(console.error);
client.login(config.DISCORD_TOKEN).catch(console.error);
