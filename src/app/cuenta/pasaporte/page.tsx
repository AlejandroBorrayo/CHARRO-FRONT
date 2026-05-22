import type { Metadata } from "next";
import { CharroPassport } from "@/components/charro/CharroPassport";

export const metadata: Metadata = {
  title: "Tu pasaporte",
  description:
    "Tu pasaporte simbólico y la invitación al canal de WhatsApp de la comunidad El Charro González.",
};

export default function PasaportePage() {
  return <CharroPassport />;
}
