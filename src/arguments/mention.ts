import { createArgument } from '../utils/createArgument';

export const mention = createArgument((value, client) => {
  if (!value.startsWith('<@' || !value.endsWith('>'))) {
    throw 'Not a mention';
  }

  value = value.slice(2, -1);

  if (value.startsWith('!')) {
    value = value.slice(1);
  }

  const user = client.users.get(value);

  if (!user) {
    throw 'Invalid mention';
  }

  return user;
});
