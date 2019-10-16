import { Client, Message } from 'discord.js';

export type ArgumentParser<T> = (value: string, client: Client) => T;

export type Argument<T, R extends boolean> = [ArgumentParser<T>, R];

export type ArgumentMap = {
  [argument: string]: Argument<any, boolean>
};

export type ParsedArgumentMap<M extends ArgumentMap> = {
  [K in keyof M]: M[K] extends Argument<infer T, infer R> ? R extends true ? T : T | undefined : never;
};

export type Execute<M extends ArgumentMap> = (args: ParsedArgumentMap<M>, message: Message) => void;

export type Command<M extends ArgumentMap> = [string, M, Execute<M>];
