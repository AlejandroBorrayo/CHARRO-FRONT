import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { AdminPanel } from "@/components/charro/admin/AdminPanel";
import { authOptions } from "@/lib/authOptions";
import { CUENTA_PASAPORTE } from "@/lib/authRouting";

export const metadata: Metadata = {
  title: "Panel de administración",
  description: "Gestión de usuarios y notificaciones de la comunidad El Charro González.",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect(CUENTA_PASAPORTE);
  }

  return <AdminPanel />;
}
