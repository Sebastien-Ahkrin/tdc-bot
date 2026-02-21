import { SlashCommandBuilder } from 'discord.js';

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
      .addChoices([{ name: 'Dessert', value: 'Dessert' }]);
  })
  .addStringOption((option) => {
    return option
      .setName('avis')
      .setDescription('Avis sur la recette')
      .setRequired(false);
  });

async function execute(interaction: any) {
  const name = interaction.options.getString('nom');
  const duration = interaction.options.getString('temps');
  const link = interaction.options.getString('lien');
  const difficulty = interaction.options.getString('difficulte');
  const recipeType = interaction.options.getString('type');
  const notice = interaction.options.getString('avis');

  await interaction.reply(
    JSON.stringify({ name, duration, link, difficulty, recipeType, notice }),
  );
}

export { command, execute };
