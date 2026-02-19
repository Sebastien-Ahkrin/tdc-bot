import {
  Client as DiscordClient,
  ClientOptions,
  Collection,
  Events,
} from 'discord.js';

import { Command, handler } from '../commands/handler';

export class Client extends DiscordClient {
  public commands: Collection<string, Command> = new Collection();

  public constructor(options: ClientOptions) {
    super(options);

    this.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      await command.execute(interaction);
    });
  }

  public async loadCommands() {
    const commands = await handler();

    for (const command of commands) {
      console.log(`Command "${command.command.name}" loaded.`);
      this.commands.set(command.command.name, command);
    }
  }
}
