const { EmbedBuilder } = require('discord.js');

// Example static leaderboard data (replace with live fetch later)
const leaderboardData = [
  { name: "🌿 Sunnel", score: 2150 },
  { name: "🍯 BeeQueen", score: 1880 },
  { name: "🌱 PlanterKing", score: 1740 },
  { name: "🌻 SunFlow", score: 1630 },
  { name: "🥚 EggMaster", score: 1510 },
  { name: "🎨 DecoQueen", score: 1480 },
  { name: "🧤 GearGod", score: 1370 },
  { name: "🍀 CloverKid", score: 1290 },
  { name: "🐝 HiveHero", score: 1215 },
  { name: "🌼 DaisyDoer", score: 1190 },
];

module.exports = {
  name: "gagleaderboard",
  description: "Display the top Grow A Garden players.",

  async execute(interaction) {
    const medals = ["🥇", "🥈", "🥉"];

    const description = leaderboardData.map((entry, index) => {
      const medal = medals[index] || `#${index + 1}`;
      return `${medal} **${entry.name}** — \`${entry.score} pts\``;
    }).join("\n");

    const embed = new EmbedBuilder()
      .setTitle("🏆 Grow A Garden — Leaderboard")
      .setDescription(description)
      .setColor("#FFD700")
      .setImage("https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif") // banner GIF
      .setFooter({ text: "Created by Sunnel 🌸", iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  }
};