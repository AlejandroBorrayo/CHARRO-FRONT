import { AuthProvider } from "@/components/authProvider";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import type { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <div className="min-h-screen">{children}</div>
    </AuthProvider>
  );
}
