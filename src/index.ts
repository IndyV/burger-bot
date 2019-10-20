import { Client, Message } from 'discord.js';
import * as express from 'express';
import { Router } from 'express';
import * as firebase from 'firebase';

import { register } from './commands/register';
import { registerWebhook } from './routes/webhook';
import { parseCommand } from './utils/parseCommand';

const token = process.env.TOKEN;
const port = process.env.PORT;

const client = new Client();
const server = express();

firebase.initializeApp({
  apiKey: 'AIzaSyCm8fqcHWtVKaqb9Z6yml8pAVI3OZ1MDG0',
  authDomain: 'burgerbot-fdc33.firebaseapp.com',
  databaseURL: 'https://burgerbot-fdc33.firebaseio.com',
  projectId: 'burgerbot-fdc33',
  storageBucket: 'burgerbot-fdc33.appspot.com',
  appId: '1:11843797210:web:8c8836f9de517f928fa5e3'
});

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

  parseCommand('!', [register], message);
});

server.use(express.json());

const router = Router();

registerWebhook(router, client);

server.use(router);

client.login(token);
server.listen(port, () => console.log(`Listening on port ${port}`));
