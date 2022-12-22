import { Group, Resolvers } from "./types";
import { Group as GroupModel } from ".prisma/client";
import { Context } from "./context";

export const resolvers: Resolvers<Context> = {
  Query: {
    groups: async (_parent, _args, ctx) => {
      if (!ctx.signedIn) return [];
      const groupModelCollection = await ctx.prisma.group.findMany({
        where: {
          GroupContributor: {
            some: {
              userId: ctx.currentUser.id,
            },
          },
        },
        select: {
          name: true,
          id: true,
          GroupContributor: {
            select: {
              user: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
        distinct: "id",
      });
      return groupModelCollection.map((group: any) => ({
        name: group.name,
        id: group.id,
        contributors: group.GroupContributor,
        createdAt: group.createdAt,
      }));
    },
  },
};
