import { SlashCommandBuilder } from 'discord.js';

const command = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Reply with pong');

async function execute(interaction: any) {
  await interaction.reply('Pong!');
}

export { command, execute };
