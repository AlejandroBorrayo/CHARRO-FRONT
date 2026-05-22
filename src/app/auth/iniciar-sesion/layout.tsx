import { authOptions } from "@/lib/authOptions";
import { getPostLoginPath } from "@/lib/authRouting";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { ReactNode } from "react";

export default async function IniciarSesionLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(getPostLoginPath(session.user.loggin_first_time));
  }

  return children;
}
