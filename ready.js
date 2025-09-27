const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    const categoryId = process.env.STATUS_CATEGORY_ID;
    const channelId = process.env.STATUS_CHANNEL_ID;

    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    // Sprawdzenie, czy kanał należy do właściwej kategorii
    if (channel.parentId !== categoryId) return;

    const embed = new EmbedBuilder()
      .setTitle('**Informacja**')
      .setDescription('Połączono z bazą danych.')
      .setColor(0x57F287) // Zielony
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  }
};
