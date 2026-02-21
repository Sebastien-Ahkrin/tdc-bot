import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import ky from 'ky';

import { Duration } from 'luxon';
import { config } from '../../env';
import { difficultyChoices, typeChoices } from '../../utils/choices';

const command = new SlashCommandBuilder()
  .setName('recette')
  .setDescription('Affiche une recette aléatoire')
  .addStringOption((option) => {
    return option
      .setName('type')
      .setDescription('Type de la recette')
      .addChoices(typeChoices)
      .setRequired(false);
  });

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
  const typeOption = interaction.options.getString('type');

  const recipe = await ky
    .get<Recipe | { data: string }>(
      `http://localhost:3333/recipe${typeOption ? `?type=${typeOption}` : ''}`,
      {
        headers: {
          'Bot-Key': config.BOT_KEY,
        },
      },
    )
    .json();

  if ('data' in recipe) {
    return await interaction.reply("Aucune recette n'as été trouvée ..");
  }

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
      value: `${duration.hours} heure(s) ${duration.minutes} minute(s)`,
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
      value: getDisplayDifficulty(recipe.difficulty),
    });
  }

  if (recipe.type) {
    fields.push({
      name: 'Type 🥗',
      value: getDisplayType(recipe.type),
    });
  }

  const embed = new EmbedBuilder()
    .setColor(0x891a20)
    .setTitle('🎲 Ta recette aléatoire 😍')
    .setFields(fields);

  await interaction.reply({ embeds: [embed] });
}

function getDisplayType(recipeType: string): string {
  return typeChoices.find((t) => t.value === recipeType)?.name || 'Erreur';
}

function getDisplayDifficulty(difficulty: string) {
  return (
    difficultyChoices.find((d) => d.value === difficulty)?.name || 'Erreur'
  );
}

export { command, execute };
