import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../../prisma/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "John@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const password: string = credentials?.password ?? "";
        const email: string = credentials?.email ?? "";

        if (email === "") {
          console.log("No email provided");
          return Promise.resolve(null);
        }

        const user = await getUserByEmail(email);

        if (!user) {
          console.log("No user found");
          return Promise.resolve(null);
        }

        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          console.log("Password incorrect");
          return Promise.resolve(null);
        }
        console.log(user);
        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
});
