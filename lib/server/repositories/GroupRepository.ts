import {
  Group as GroupModel,
  User as UserModel,
  GroupContributor as GroupContributorModel,
} from "@prisma/client";
import prismaClient from "lib/server/prisma-client";
import { Repository, RepositoryConstructor } from "./types";

export interface IGroupRepository {
  addContributor: (contributorId: string) => Promise<void>;
  removeContributor: (contributorId: string) => Promise<void>;
}

interface GroupRepositoryConstructor
  extends Repository<GroupModel>,
    IGroupRepository {}

const GroupRepository: RepositoryConstructor<
  GroupModel,
  GroupRepositoryConstructor
> = class _GroupRepository implements GroupRepositoryConstructor {
  identifier: string;
  currentUserId: string;
  resource: GroupModel | null = null;
  contributors: GroupContributorModel[] = [];

  static async get(currentUserId: string, identifier: string) {
    const repo = new GroupRepository(currentUserId, identifier);
    await repo.reload();
    return repo;
  }

  constructor(currentUserId: string, id: string) {
    this.identifier = id;
    this.currentUserId = currentUserId;
  }

  async update(attributes: Partial<GroupModel>) {
    await this.__ensureWritePermission();
    await prismaClient.group.update({
      where: {
        id: this.identifier,
      },
      data: {
        ...attributes,
      },
    });
  }

  static async create(
    currentUserId: string,
    attributes: Omit<GroupModel, "id">
  ) {
    const result = await prismaClient.group.create({
      data: {
        ...attributes,
      },
    });

    const repo = await GroupRepository.get(currentUserId, result.id);
    await repo.addContributor(currentUserId);
    return repo.reload() as any;
  }

  async delete() {
    await this.__ensureWritePermission();
    await prismaClient.group.delete({
      where: { id: this.identifier },
    });
  }

  async addContributor(contributorId: string) {
    await this.__ensureWritePermission();
    await prismaClient.groupContributor.create({
      data: {
        user: { connect: { id: contributorId } },
        group: { connect: { id: this.identifier } },
        createdAt: new Date(),
      },
    });
  }

  async removeContributor(contributorId: string) {
    await this.__ensureWritePermission();
    await prismaClient.groupContributor.delete({
      where: {
        userId_groupId: {
          groupId: this.identifier,
          userId: contributorId,
        },
      },
    });
  }

  async reload() {
    this.resource = await prismaClient.group.findUnique({
      where: {
        id: this.identifier,
      },
    });
    this.contributors = await prismaClient.groupContributor.findMany({
      where: {
        group: { id: this.identifier },
      },
    });
    return this as any;
  }

  async __ensureWritePermission() {
    await prismaClient.group.findFirstOrThrow({
      where: {
        id: this.identifier,
        GroupContributor: {
          every: {
            userId: this.currentUserId,
          },
        },
      },
    });
  }
};

export default GroupRepository;
