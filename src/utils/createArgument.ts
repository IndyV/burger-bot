import { ArgumentParser } from '../types';

export function createArgument<T>(parse: ArgumentParser<T>) {
  return parse;
}
