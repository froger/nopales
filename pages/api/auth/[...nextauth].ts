import NextAuth, { Account, CallbacksOptions, Profile } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { MeRepository, prismaClient } from "lib/server";
import { NextApiResponse, NextApiRequest } from "next";

const port = parseInt(process.env.SMTP_PORT || "587", 10);
const callbacks = (req: NextApiRequest) =>
  ({
    async jwt({ token }) {
      if (req.url === "/api/auth/session?refresh" && token.email && token.sub) {
        const repo = await MeRepository.get(token.sub, token.email);
        token.name = repo.resource?.name || "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        name: token.name,
      };
      return session;
    },
  } as Partial<CallbacksOptions<Profile, Account>>);

export default async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: {
          host: process.env.SMTP_HOST,
          port: port,
          secure: port === 465,
          tls: {
            servername: process.env.SMTP_TLS_HOST || process.env.SMTP_HOST,
          },
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
          requireTLS: true,
        },
        from: process.env.SMTP_FROM,
        maxAge: 15 * 60, // Magic links are valid for 15 min only
      }),
    ],
    adapter: PrismaAdapter(prismaClient),
    session: {
      strategy: "jwt",
      maxAge: 4 * 24 * 60 * 60, // 4 days
      updateAge: 24 * 60 * 60, // 24 hours
      generateSessionToken: uuid,
    },
    callbacks: callbacks(req),
  });
