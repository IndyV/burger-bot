import { ArgumentMap, Command, Execute } from '../types';

export function createCommand<M extends ArgumentMap>(name: string, args: M, execute: Execute<M>): Command<M> {
  return [name, args, execute];
}
