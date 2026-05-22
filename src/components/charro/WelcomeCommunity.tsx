"use client";

import { useRouter } from "next/navigation";
import { CharroCommunityInvite } from "@/components/charro/CharroCommunityInvite";
import { CharroOnboardingShell } from "@/components/charro/CharroOnboardingShell";

export function WelcomeCommunity() {
  const router = useRouter();

  return (
    <CharroOnboardingShell
      eyebrow="Bienvenida"
      title="¡Bienvenido a la familia Charro!"
      subtitle="Únete a la comunidad que celebra la vida y la riqueza de nuestra cultura mexicana. Escanea el código o entra por el enlace."
    >
      <CharroCommunityInvite
        showNextButton
        onNext={() => router.push("/cuenta/pasaporte")}
      />
    </CharroOnboardingShell>
  );
}
