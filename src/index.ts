import { Client } from 'discord.js';
import * as express from 'express';

const token = process.env.TOKEN;
const port = process.env.PORT;

const client = new Client();
const server = express();

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

server.get('/', async (req, res) => {
  res.send('It\'s burger time baby');
});

client.login(token);
server.listen(port, () => console.log(`Listening on port ${port}`));
