import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

import ky from 'ky';
import { config } from '../../env';

const command = new SlashCommandBuilder()
  .setName('add')
  .setDescription('Ajoute une recette')
  .addStringOption((option) => {
    return option
      .setName('nom')
      .setDescription('Nom de la recette')
      .setRequired(true);
  })
  .addNumberOption((option) => {
    return option
      .setName('temps')
      .setDescription('Temps de la recette exprimé en minutes')
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName('lien')
      .setDescription('Lien de la recette')
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName('difficulte')
      .setDescription('Difficulté de la recette')
      .setRequired(false)
      .addChoices([
        { name: 'Dur', value: 'hard' },
        { name: 'Moyenne', value: 'medium' },
        { name: 'Facile', value: 'easy' },
      ]);
  })
  .addStringOption((option) => {
    return option
      .setName('type')
      .setDescription('Type de la recette')
      .setRequired(false)
      .addChoices([
        { name: 'Dessert', value: 'dessert' },
        { name: 'Plat', value: 'dish' },
      ]);
  })
  .addStringOption((option) => {
    return option
      .setName('avis')
      .setDescription('Avis sur la recette')
      .setRequired(false);
  });

async function execute(interaction: ChatInputCommandInteraction<CacheType>) {
  const name = interaction.options.getString('nom');
  const duration = interaction.options.getNumber('temps');
  const link = interaction.options.getString('lien');
  const difficulty = interaction.options.getString('difficulte') || undefined;
  const recipeType = interaction.options.getString('type') || undefined;
  const notice = interaction.options.getString('avis') || undefined;

  await ky.post('http://localhost:3333/recipe', {
    headers: {
      'Bot-Key': config.BOT_KEY,
    },
    json: {
      name,
      duration,
      link,
      difficulty,
      type: recipeType,
      notice,
    },
  });

  await interaction.reply(`Recipe ${name} successfully added`);
}

export { command, execute };
