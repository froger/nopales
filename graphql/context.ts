import { PrismaClient } from "@prisma/client";
import { prismaClient } from "lib/server";
import { UserModel } from "lib/server/repositories/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type PublicContext = { prisma: PrismaClient };
type UserContext = PublicContext & { currentUser: UserModel; signedIn: true };
type VisitorContext = PublicContext & { signedIn: false };
export type Context = UserContext | VisitorContext;
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const token = await getToken({ req });
  if (token)
    return {
      prisma: prismaClient,
      currentUser: {
        email: `${token.email}`,
        name: `${token.name}`,
        id: `${token.sub}`,
      },
      signedIn: true,
    };
  return {
    prisma: prismaClient,
    signedIn: false,
  };
}
