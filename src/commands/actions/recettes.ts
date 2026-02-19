import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ky from 'ky';

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

async function execute(interaction: any) {
  const recipe = await ky.get<Recipe>('http://localhost:3333/recipes').json();

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('🎲 Ta recette aléatoire 😍')
    .setFields([
      {
        name: 'Titre',
        value: recipe.name,
      },
      {
        name: 'Temps',
        value: String(recipe.duration),
      },
      {
        name: 'Difficulé',
        value: recipe.difficulty ?? '',
      },
      {
        name: 'Type',
        value: recipe.type ?? '',
      },
      {
        name: 'Lien',
        value: recipe.link,
      },
      {
        name: 'Conseil',
        value: recipe.notice ?? '',
      },
    ]);

  await interaction.reply({ embeds: [embed] });
}

export { command, execute };
