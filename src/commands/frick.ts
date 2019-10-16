import { mention } from '../arguments/mention';
import { createCommand } from '../utils/createCommand';

export const frick = createCommand('frick', {
  target: [mention, true]
}, async ({ target }, message) => {
  await message.channel.send(`Frick ${target}`);
});
