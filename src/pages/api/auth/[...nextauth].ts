import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.API_KEY || "",
            },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            console.error("Login API Error:", await res.text()); // Debug response
            throw new Error("Invalid credentials");
          }

          const user = await res.json();
console.log("resp",user?.user._id)
          if (!user?.token) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user?.user._id,
            name:user?.user.name,
            email: user?.user.email,
            permission: user?.user.permission,
            token: user.token,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          permission: user.permission,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Set this in your .env.local
  pages: {
    signIn: "/auth/signin", // Custom login page
  },
};

export default NextAuth(authOptions);
