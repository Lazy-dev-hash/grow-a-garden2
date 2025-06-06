const { EmbedBuilder } = require('discord.js');

const gardenArt = [
  {
    title: "🌼 Blooming Bliss",
    url: "https://media.giphy.com/media/3oz8xKaR836UJOYeOc/giphy.gif"
  },
  {
    title: "🌸 Peaceful Garden",
    url: "https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif"
  },
  {
    title: "🌿 Nature’s Calm",
    url: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"
  },
  {
    title: "🍄 Garden Dreams",
    url: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
  },
  {
    title: "🪴 Just Plant Things",
    url: "https://media.giphy.com/media/13V60Aj4U2UCZW/giphy.gif"
  }
];

module.exports = {
  name: "gagart",
  description: "Send a random relaxing garden GIF or image.",
  async execute(interaction) {
    const random = gardenArt[Math.floor(Math.random() * gardenArt.length)];

    const embed = new EmbedBuilder()
      .setTitle(random.title)
      .setImage(random.url)
      .setColor("#77dd77")
      .setFooter({
        text: "Created by Sunnel 🌸",
        iconURL: interaction.client.user.displayAvatarURL()
      });

    await interaction.reply({ embeds: [embed] });
  }
};