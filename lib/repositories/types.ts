import { DefaultSession } from "next-auth";

export interface  Repository<Model extends Record<string, any>> {
  identifier: string;
  resource: Model|null;
  update: (model: Partial<Model>) => Promise<void>
  setup: () => Promise<void>
}

export interface  RepositoryConstructor<Model extends Record<string, any>> {
  get: (identifier: string) => Promise<Repository<Model>>;
  new (identifier: string): Repository<Model>;
}

export type UserModel = {name?: string, email?: string, picture?: string}