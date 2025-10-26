import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }

        const passwordHash = process.env.ADMIN_PASSWORD_HASH || "";

        const isValid = await bcrypt.compare(
          credentials.password,
          passwordHash
        );

        if (isValid) {
          return {
            id: "admin",
            name: "Manuel Echavarria Romero",
            email: "admin@manecharo.com",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/update/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
