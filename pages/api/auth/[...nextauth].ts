import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      maxAge: 15 * 60, // Magic links are valid for 15 min only
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 4 * 24 * 60 * 60, // 4 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: uuid,
  },
});
