import { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/service/user/user.queries";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }

          const res = await loginUser(
            credentials?.email,
            credentials?.password
          );

          if (res?.success) {
            return res.data;
          } else {
            throw new Error(res?.error);
          }
        } catch (error: any) {
          console.error(error);
          throw new Error(
            error?.message ?? "something went wrong on authenticate"
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }: any) {
      session.user = token;
      /*if (token?.long_login) {
        session.maxAge = Number(token?.long_login) * 24 * 60 * 60;
      }*/
      return session;
    },
  },
};
