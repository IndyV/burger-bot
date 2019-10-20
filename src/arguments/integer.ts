import { createArgument } from '../utils/createArgument';

export const integer = createArgument((value) => {
  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    throw 'Not a number';
  }

  return parsed;
});
