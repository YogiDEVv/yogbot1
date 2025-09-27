// commands/ping.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sprawdź opóźnienie bota.'),
  async execute(interaction, client) {
    const ping = client.ws.ping;
    const embed = new EmbedBuilder()
      .setTitle('⏰ Informacje dotyczące opóźnienia bota')
      .setDescription(`Obecne opóźnienie bota wynosi: **${ping}ms**`)
      .setColor(0x5865F2)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    console.log(`📩 /ping -> ${ping}ms`);
  }
};
