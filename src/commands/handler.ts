import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

const folderPath = path.join(__dirname, 'actions');

export interface Command {
  command: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction<CacheType>,
  ) => Promise<void>;
}

export async function handler() {
  const result: Array<Command> = [];

  const commands = await fs.readdir(folderPath);
  const typescriptCommands = commands.filter((fileName) =>
    fileName.endsWith('.ts'),
  );

  for (const command of typescriptCommands) {
    const filePath = path.join(folderPath, command);
    result.push(require(filePath));
  }

  return result;
}
