const { EmbedBuilder } = require('discord.js');

const rewards = [
  { type: "Seed", name: "Sunflower Seed 🌻", rarity: "Common" },
  { type: "Seed", name: "Blueberry Seed 🫐", rarity: "Common" },
  { type: "Gear", name: "Golden Shovel 🥇", rarity: "Rare" },
  { type: "Cosmetic", name: "Flower Crown 👑", rarity: "Rare" },
  { type: "Points", amount: 100, rarity: "Uncommon" },
  { type: "Seed", name: "Mystic Seed ✨", rarity: "Epic" },
  { type: "Gear", name: "Diamond Hoe 💎", rarity: "Epic" },
  { type: "Cosmetic", name: "Butterfly Wings 🦋", rarity: "Epic" },
];

function getRandomReward() {
  // Weighted random based on rarity
  const pool = [];

  rewards.forEach(r => {
    let weight = 1;
    if (r.rarity === "Common") weight = 5;
    else if (r.rarity === "Uncommon") weight = 3;
    else if (r.rarity === "Rare") weight = 2;
    else if (r.rarity === "Epic") weight = 1;

    for (let i = 0; i < weight; i++) pool.push(r);
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = {
  name: "gaggacha",
  description: "Plant a mystery seed and get a random reward!",
  async execute(interaction) {
    const reward = getRandomReward();

    let description = "";
    if (reward.type === "Points") {
      description = `You got **${reward.amount}** Grow A Garden points! 🎉`;
    } else {
      description = `You received a **${reward.rarity}** ${reward.type}: **${reward.name}**! 🌱`;
    }

    const embed = new EmbedBuilder()
      .setTitle("🎲 Mystery Seed Gacha")
      .setDescription(description)
      .setColor("#a020f0")
      .setImage("https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif")
      .setFooter({
        text: "Created by Sunnel 🌸",
        iconURL: interaction.client.user.displayAvatarURL()
      });

    await interaction.reply({ embeds: [embed] });
  }
};