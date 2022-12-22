import { Group, User } from "@prisma/client";
export interface Repository<Model extends Record<string, any>> {
  /**
   * Unique identifier (uuid or other)
   */
  identifier: string;
  /**
   * User who want to see the resource
   */
  currentUserId: string;
  /**
   * resource to manipulate
   */
  resource: Model | null;
  /**
   * Delete a resource
   */
  delete: () => Promise<void>;
  /**
   * Update a resource
   */
  update: (model: Partial<Model>) => Promise<void>;
  /**
   * Reload the repository
   */
  reload: () => Promise<Repository<Model>>;
}

export interface RepositoryConstructor<
  Model extends Record<string, any>,
  Repo extends Repository<Model> = Repository<Model>
> {
  get: (currentUserId: string, identifier: string) => Promise<Repo>;
  /**
   * Create a resource
   */
  create: (currentUserId: string, model: Omit<Model, "id">) => Promise<Repo>;
  new (currentUserId: string, identifier: string): Repo;
}

export type UserModel = Pick<User, "name" | "email" | "id">;
export type GroupModel = Group;
