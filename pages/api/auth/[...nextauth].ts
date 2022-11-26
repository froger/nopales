import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

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
});
