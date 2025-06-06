const { EmbedBuilder } = require('discord.js');

const cooldowns = new Map();

module.exports = {
  name: "gagdaily",
  description: "Claim your daily Grow A Garden reward!",
  async execute(interaction) {
    const userId = interaction.user.id;
    const now = Date.now();

    const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in ms

    if (cooldowns.has(userId)) {
      const expirationTime = cooldowns.get(userId) + cooldownTime;

      if (now < expirationTime) {
        const remaining = expirationTime - now;
        const hours = Math.floor(remaining / 1000 / 60 / 60);
        const minutes = Math.floor((remaining / 1000 / 60) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);

        const embed = new EmbedBuilder()
          .setTitle("⏳ Daily Reward Cooldown")
          .setDescription(`You can claim your next daily reward in **${hours}h ${minutes}m ${seconds}s**.`)
          .setColor("#FFA500")
          .setFooter({
            text: "Created by Sunnel 🌸",
            iconURL: interaction.client.user.displayAvatarURL()
          });

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }

    // Reward user here - customize as needed
    const rewardPoints = Math.floor(Math.random() * 50) + 50; // 50-99 points

    // Save cooldown time
    cooldowns.set(userId, now);

    const embed = new EmbedBuilder()
      .setTitle("🎉 Daily Reward Claimed!")
      .setDescription(`You received **${rewardPoints}** Grow A Garden points!`)
      .setColor("#00FF00")
      .setFooter({
        text: "Created by Sunnel 🌸",
        iconURL: interaction.client.user.displayAvatarURL()
      });

    return interaction.reply({ embeds: [embed] });
  }
};