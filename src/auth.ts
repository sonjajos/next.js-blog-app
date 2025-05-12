import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import Google from "next-auth/providers/google";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: !!process.env.GITHUB_CLIENT_ID ? [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ] : [],
  trustHost: true,
  adapter: PrismaAdapter(db),
});
