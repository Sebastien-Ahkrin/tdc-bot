import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import ky from 'ky';

import { Duration } from 'luxon';

const command = new SlashCommandBuilder()
  .setName('recettes')
  .setDescription('Affiche toutes les recettes');

interface Recipe {
  id: number;
  name: string;
  duration: number;
  link: string;
  difficulty: string | null;
  type: string | null;
  notice: string | null;
}

async function execute(interaction: ChatInputCommandInteraction<CacheType>) {
  const recipe = await ky.get<Recipe>('http://localhost:3333/recipes').json();

  const duration = Duration.fromObject({ minutes: recipe.duration }).shiftTo(
    'hours',
    'minutes',
    'seconds',
  );

  const fields = [
    {
      name: 'Titre 🍽',
      value: recipe.name,
    },
    {
      name: 'Temps ⏱',
      value: `${duration.hours}:${duration.minutes}`,
    },
    {
      name: 'Lien 🔗',
      value: recipe.link,
    },
  ];

  if (recipe.notice) {
    fields.push({
      name: 'Conseil 💬',
      value: recipe.notice,
    });
  }

  if (recipe.difficulty) {
    fields.push({
      name: 'Difficulé 🔥',
      value: recipe.difficulty,
    });
  }

  if (recipe.type) {
    fields.push({
      name: 'Type 🥗',
      value: recipe.type,
    });
  }

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('🎲 Ta recette aléatoire 😍')
    .setFields(fields);

  await interaction.reply({ embeds: [embed] });
}

export { command, execute };
