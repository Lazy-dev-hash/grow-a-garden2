const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: "gagweather",
  description: "Check the current Grow A Garden weather bonus.",
  async execute(interaction) {
    try {
      const res = await axios.get("https://growagardenstock.com/api/stock/weather");
      const weather = res.data;

      const icon = weather.icon || "🌤️";
      const condition = weather.currentWeather || "Unknown";
      const cropBonus = weather.cropBonuses || "None";

      const embed = new EmbedBuilder()
        .setTitle("🌦️ Current Garden Weather")
        .setDescription(`${icon} **${condition}**\n🪴 Crop Bonus: **${cropBonus}**`)
        .setColor("#87CEEB")
        .setImage("https://media.giphy.com/media/xTcnT2EwPbnv4ZfKh6/giphy.gif")
        .setFooter({
          text: "Created by Sunnel 🌸",
          iconURL: interaction.client.user.displayAvatarURL()
        });

      await interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.error("Weather fetch error:", err);
      await interaction.reply("⚠️ Failed to fetch weather data.");
    }
  }
};