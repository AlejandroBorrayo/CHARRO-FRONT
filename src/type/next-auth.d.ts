import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      sub: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
      loggin_first_time?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    role?: string | null;
    accessToken?: string;
    loggin_first_time?: boolean;
  }
}
