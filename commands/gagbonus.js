const { EmbedBuilder } = require('discord.js');

function getCountdownToMidnight() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0); // Set to midnight next day

  const diffMs = nextMidnight - now;
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
  name: "gagbonus",
  description: "Check how long until the next daily bonus resets.",
  async execute(interaction) {
    const countdown = getCountdownToMidnight();

    const embed = new EmbedBuilder()
      .setTitle("🎁 Daily Bonus Countdown")
      .setDescription(`Next bonus resets in: **${countdown}**`)
      .setColor("#ffcc00")
      .setImage("https://media.giphy.com/media/3oEjHCWdU7F4nScGZW/giphy.gif")
      .setFooter({
        text: "Created by Sunnel 🌸",
        iconURL: interaction.client.user.displayAvatarURL()
      });

    await interaction.reply({ embeds: [embed] });
  }
};