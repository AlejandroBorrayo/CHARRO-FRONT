import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { getAuthSecret } from "@/lib/authSecret";
import { extractLogginFirstTime, LOGIN_PATH } from "@/lib/authRouting";
import { login } from "@/services/auth";

type AccessTokenPayload = {
  sub: string;
  name?: string;
  email?: string;
  role?: string;
  loggin_first_time?: boolean;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { access_token } = await login(
            credentials.email,
            credentials.password
          );

          const decoded = jwtDecode<AccessTokenPayload>(access_token);

          return {
            id: decoded.sub,
            name: decoded.name ?? decoded.email,
            email: decoded.email ?? credentials.email,
            role: decoded.role,
            accessToken: access_token,
            loggin_first_time: extractLogginFirstTime(
              decoded as Record<string, unknown>
            ),
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: LOGIN_PATH,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          role?: string;
          accessToken?: string;
          loggin_first_time?: boolean;
        };
        token.sub = user.id;
        token.role = u.role;
        token.accessToken = u.accessToken;
        token.loggin_first_time = u.loggin_first_time;
      }

      if (token.accessToken) {
        try {
          const decoded = jwtDecode<AccessTokenPayload>(
            token.accessToken as string
          );
          token.loggin_first_time = extractLogginFirstTime(
            decoded as Record<string, unknown>
          );
        } catch {
          /* token inválido */
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.sub = token.sub ?? "";
        session.user.role = (token.role as string) ?? null;
        session.user.loggin_first_time = token.loggin_first_time as
          | boolean
          | undefined;
      }
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
  secret: getAuthSecret(),
};
