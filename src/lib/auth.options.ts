import { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'Credentials',
      credentials: {
        userName: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        remember: { label: 'Remember me', type: 'boolean' },
        userType: { label: 'User Type', type: "text" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.userName || !credentials?.password) {
            throw new Error('Invalid credentials');
          }


          return {
            userName: credentials.userName,
            remember: credentials.remember,
            userType: credentials.userType
          }
        } catch (error: any) {
          console.error(error);
          throw new Error(error?.message ?? "something went wrong on authenticate");
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 24 * 60 * 60
  },
  jwt: {
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }: any) {
      return {
        ...token,
        ...user
      };
    },
    async session({ session, token }: any) {
      session.user = token;
      /*if (token?.long_login) {
        session.maxAge = Number(token?.long_login) * 24 * 60 * 60;
      }*/
      return session;
    }
  }
};