import prismaClient from "lib/prisma-client";
import { Repository, RepositoryConstructor, UserModel } from "./types";

const MeRepository: RepositoryConstructor<UserModel> = class _MeRepository implements Repository<UserModel>{
  identifier: string;
  resource: UserModel|null = null;

  static async get(identifier: string) {
    const repo = new MeRepository(identifier)
    await repo.setup();
    return repo;
  }

  constructor(email: string){
    this.identifier = email;
  }
  
  async update(attributes: Partial<UserModel>) {
    await prismaClient.user.update({
      where: {
        email: this.identifier,
      },
      data: {
        ...attributes
      },
    });
  }

  async setup() {
    this.resource = await prismaClient.user.findUnique({
      where: {
        email: this.identifier
      },
    })
  }
}

export default MeRepository