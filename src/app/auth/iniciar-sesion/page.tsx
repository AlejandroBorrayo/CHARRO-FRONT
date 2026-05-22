import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/lib/authRouting";

export default function IniciarSesionPage() {
  redirect(LOGIN_PATH);
}
