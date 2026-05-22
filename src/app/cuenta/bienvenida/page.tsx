import type { Metadata } from "next";
import { WelcomeCommunity } from "@/components/charro/WelcomeCommunity";

export const metadata: Metadata = {
  title: "Bienvenida",
  description: "Únete al canal de WhatsApp de la comunidad El Charro González.",
};

export default function BienvenidaPage() {
  return <WelcomeCommunity />;
}
