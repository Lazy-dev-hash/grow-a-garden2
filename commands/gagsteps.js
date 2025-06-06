const { EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');

// Example tips (you can add more)
const tips = [
  "🌱 Use compost to boost crop growth speed!",
  "🐝 Don't forget to check honey stock every hour for rare types!",
  "🌤️ Some crops grow faster during sunny weather — time your planting!",
  "🎨 Cosmetics reset every 4 hours. Visit the shop often!",
  "🛠️ Gear enhances efficiency — collect the best combo!",
  "🍯 Stockpile honey before events for better trades!"
];

module.exports = {
  name: "gagtip",
  description: "Get a random Grow A Garden tip.",
  async execute(interaction) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    const embed = new EmbedBuilder()
      .setColor("#66cc66")
      .setTitle("🌿 Grow A Garden Tip")
      .setDescription(randomTip)
      .setImage("https://media.giphy.com/media/l0HUpt2s9Pclgt9Vm/giphy.gif") // aesthetic GIF
      .setFooter({ text: "Created by Sunnel 🌸", iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },

  // Daily schedule at 9 AM Manila time
  scheduleDaily(client) {
    schedule.scheduleJob({ hour: 9, minute: 0, tz: 'Asia/Manila' }, async () => {
      const channelId = '1380373829494505552'; // 🔁 Replace with your tip channel ID
      const channel = await client.channels.fetch(channelId);
      if (!channel) return;

      const tip = tips[Math.floor(Math.random() * tips.length)];

      const embed = new EmbedBuilder()
        .setColor("#66cc66")
        .setTitle("🌞 Daily Grow A Garden Tip")
        .setDescription(tip)
        .setImage("https://media.giphy.com/media/3orieVU3F0f9r41Udy/giphy.gif")
        .setFooter({ text: "Created by Sunnel 🌸", iconURL: client.user.displayAvatarURL() });

      await channel.send({ embeds: [embed] });
    });
  }
};