import { AuthProvider } from "@/components/authProvider";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { ReactNode } from "react";

export default async function CuentaLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/iniciar-sesion");
  }

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
