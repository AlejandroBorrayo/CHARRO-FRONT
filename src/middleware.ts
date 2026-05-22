import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getAuthSecret } from "@/lib/authSecret";
import {
  CUENTA_BIENVENIDA,
  CUENTA_PASAPORTE,
  LOGIN_PATH,
  needsWelcome,
} from "@/lib/authRouting";

const WELCOME_PATH = CUENTA_BIENVENIDA;
const PASAPORTE_PATH = CUENTA_PASAPORTE;

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const logginFirstTime = req.nextauth.token?.loggin_first_time as
      | boolean
      | undefined;
    const isWelcome = path === WELCOME_PATH || path.startsWith(`${WELCOME_PATH}/`);
    const isPasaporte =
      path === PASAPORTE_PATH || path.startsWith(`${PASAPORTE_PATH}/`);
    const mustWelcome = needsWelcome(logginFirstTime);

    if (
      mustWelcome &&
      path.startsWith("/cuenta") &&
      !isWelcome &&
      !isPasaporte
    ) {
      return NextResponse.redirect(new URL(WELCOME_PATH, req.url));
    }

    if (!mustWelcome && isWelcome) {
      return NextResponse.redirect(new URL(PASAPORTE_PATH, req.url));
    }

    return NextResponse.next();
  },
  {
    secret: getAuthSecret(),
    pages: {
      signIn: LOGIN_PATH,
    },
  }
);

export const config = {
  matcher: ["/cuenta/:path*"],
};
