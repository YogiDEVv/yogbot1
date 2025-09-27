const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'error',
  async execute(error, client) {
    console.error('❌ Klilent Discord został wyłączony:', error);

    const categoryId = process.env.STATUS_CATEGORY_ID;
    const channelId = process.env.STATUS_CHANNEL_ID;

    const channel = await client.channels.fetch(channelId);
    if (!channel || channel.parentId !== categoryId) return;

    const embed = new EmbedBuilder()
      .setTitle('**Informacja**')
      .setDescription('Baza danych została odłączona')
      .setColor(0xED4245) // Czerwony
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  }
};
