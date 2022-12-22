import prismaClient from "lib/server/prisma-client";
import { Repository, RepositoryConstructor } from "./types";
import { User as UserModel } from "@prisma/client";

const MeRepository: RepositoryConstructor<UserModel> = class _MeRepository
  implements Repository<UserModel>
{
  identifier: string;
  currentUserId: string;
  resource: UserModel | null = null;

  static async get(currentUserId: string, identifier: string) {
    const repo = new MeRepository(currentUserId, identifier);
    await repo.reload();
    return repo;
  }

  constructor(currentUserId: string, email: string) {
    this.currentUserId = currentUserId;
    this.identifier = email;
  }

  async update(attributes: Partial<UserModel>) {
    await prismaClient.user.update({
      where: {
        email: this.identifier,
      },
      data: {
        ...attributes,
      },
    });
  }

  async reload() {
    this.resource = await prismaClient.user.findUnique({
      where: {
        email: this.identifier,
      },
    });
    return this;
  }

  static async create() {
    return Promise.reject("Not implemented");
  }

  async delete() {
    throw new Error("Not Implemented");
  }
};

export default MeRepository;
