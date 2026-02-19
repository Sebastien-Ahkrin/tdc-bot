import { REST, Routes } from 'discord.js';
import { config } from '../src/env';
import { handler } from '../src/commands/handler';

const rest = new REST().setToken(config.DISCORD_TOKEN);

async function deploy(): Promise<void> {
  const cmds = await handler();

  const data: any = await rest.put(
    Routes.applicationCommands(config.DISCORD_CLIENT_ID),
    {
      body: cmds.map((cmd) => cmd.command),
    },
  );

  console.log(`Successfully deployed! ${data.length} commands`);
}

deploy().catch(console.error);
