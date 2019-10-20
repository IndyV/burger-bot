import { Client, Message } from 'discord.js';
import * as express from 'express';

import { frick } from './commands/frick';
import { parseCommand } from './utils/parseCommand';
import { webhook } from './routes/webhook';

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

client.on('message', async (message: Message) => {
  if (message.channel.type !== 'text' || message.author.bot) {
    return;
  }

  parseCommand('!', [frick], message);
});

server.use(express.json());
server.use(webhook);

client.login(token);
server.listen(port, () => console.log(`Listening on port ${port}`));
