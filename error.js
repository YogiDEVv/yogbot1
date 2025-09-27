const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'error',
  async execute(error, client) {
    console.error('❌ Błąd klienta Discord:', error);

    const categoryId = process.env.STATUS_CATEGORY_ID;
    const channelId = process.env.STATUS_CHANNEL_ID;

    const channel = await client.channels.fetch(channelId);
    if (!channel || channel.parentId !== categoryId) return;

    const embed = new EmbedBuilder()
      .setTitle('**Informacja**')
      .setDescription('Wystąpił błąd podczas łączenia z bazą danych, Spróbuj ponownie później.')
      .setColor(0xFAA61A) // Pomarańczowy
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  }
};
