import { Client } from 'discord.js';

const token = process.env.TOKEN;
const client = new Client();

client.on('ready', () => {
  if (!client.user) {
    return;
  }

  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (!message.author || message.author.bot || !message.reply) {
    return;
  }

  await message.reply('t');
});

client.login(token);
