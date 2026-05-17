const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const allowedRoleName = "Staff"; // change this

  const hasRole = message.member.roles.cache.some(
    role => role.name === allowedRoleName
  );

  // delete forwarded messages from people WITHOUT role
  if (message.messageSnapshots?.size > 0 && !hasRole) {
    await message.delete().catch(() => {});
  }
});

client.login(process.env.TOKEN);