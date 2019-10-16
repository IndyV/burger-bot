import { Message } from 'discord.js';

import { ArgumentParser, Command } from '../types';

export async function parseCommand(prefix: string, commands: Command<any>[], message: Message) {
  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const name = args.shift()!.toLowerCase();
  const command = commands.find(([n]) => n === name);

  if (!command) {
    await message.channel.send('Can\'t find that command');

    return;
  }

  const mapped = Object.keys(command[1]).map((key) => {
    const value = command[1][key];

    return {
      name: key,
      parser: value[0] as ArgumentParser<any>,
      required: value[1] as boolean
    };
  });
  const required = mapped.filter((m) => m.required).length;

  if (required > args.length || args.length > mapped.length) {
    await message.channel.send('Invalid arguments');

    return;
  }

  let parsed = {};

  try {
    parsed = args.reduce((previous, current, index) => {
      const m = mapped[index];

      return {
        ...previous,
        [m.name]: m.parser(current, message.client)
      };
    }, {});
  } catch (e) {
    await message.channel.send(e);

    return;
  }

  command[2](parsed, message);
}
