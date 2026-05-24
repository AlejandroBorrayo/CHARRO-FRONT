import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { LoginForm } from "@/components/charro/LoginForm";
import { authOptions } from "@/lib/authOptions";
import { getPostLoginPath } from "@/lib/authRouting";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description:
    "Inicia sesión en la comunidad de El Charro González y celebra la riqueza de la cultura mexicana.",
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(getPostLoginPath(session.user.loggin_first_time, session.user.role));
  }

  return <LoginForm />;
}
