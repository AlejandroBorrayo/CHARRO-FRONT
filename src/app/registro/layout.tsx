import { authOptions } from "@/lib/authOptions";
import { CUENTA_PASAPORTE } from "@/lib/authRouting";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { ReactNode } from "react";

export default async function RegistroLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(CUENTA_PASAPORTE);
  }

  return children;
}
