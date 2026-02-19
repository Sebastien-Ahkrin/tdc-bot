import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

const command = new SlashCommandBuilder()
  .setName('recettes')
  .setDescription('Affiche toutes les recettes');

async function execute(interaction: any) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('🎲 Ta recette aléatoire 😍')
    .setFields([
      {
        name: 'Titre',
        value: 'placeholder',
      },
      {
        name: 'Temps',
        value: 'placeholder',
      },
      {
        name: 'Difficulé',
        value: 'placeholder',
      },
      {
        name: 'Type',
        value: 'placeholder',
      },
      {
        name: 'Lien',
        value: 'placeholder',
      },
      {
        name: 'Conseil',
        value: 'placeholder',
      },
    ]);

  await interaction.reply({ embeds: [embed] });
}

export { command, execute };
