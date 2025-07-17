import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accessToken?: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.user.findFirst({
          where: {
            email,
          },
        });

        if (!user?.emailVerified) {
          console.log("❌ Missing Users");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.password_hash ?? "",
        );

        if (!passwordMatch) {
          console.log("❌ Wrong Password");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      try {
        const userId = user.id;
        if (!userId) {
          throw new Error("User id undefined");
        }

        await db.personalInfo.create({
          data: { userId },
        });

        await db.financialInfo.create({
          data: { userId },
        });

        await db.personalIncome.create({
          data: { userId },
        });

        await db.personalExpense.create({
          data: { userId },
        });
      } catch (err) {
        console.error("Error creating profile for user:", err);
      }
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        name: token.name!,
        email: token.email!,
      },
    }),
  },
} satisfies NextAuthConfig;
