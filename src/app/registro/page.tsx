import type { Metadata } from "next";
import { RegisterForm } from "@/components/charro/RegisterForm";

export const metadata: Metadata = {
  title: "Registro",
  description:
    "Únete a la comunidad de El Charro González y celebra la riqueza de la cultura mexicana.",
};

export default function RegistroPage() {
  return <RegisterForm />;
}
