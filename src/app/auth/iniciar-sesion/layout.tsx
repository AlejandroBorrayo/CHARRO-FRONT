import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/lib/authRouting";

export default function IniciarSesionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  redirect(LOGIN_PATH);
}
