"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { CharroOnboardingShell } from "@/components/charro/CharroOnboardingShell";
import { UsersTab } from "@/components/charro/admin/UsersTab";
import { NotificationsTab } from "@/components/charro/admin/NotificationsTab";
import { LOGIN_PATH } from "@/lib/authRouting";

type AdminTab = "users" | "notifications";

const tabs: { id: AdminTab; label: string }[] = [
  { id: "users", label: "Usuarios" },
  { id: "notifications", label: "Notificaciones" },
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("users");
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut({ callbackUrl: LOGIN_PATH });
  }

  return (
    <CharroOnboardingShell
      fullWidth
      eyebrow="Administración"
      title="Panel del administrador"
      subtitle="Gestiona los miembros de la comunidad y envía avisos por correo."
    >
      <div className="charro-admin">
        <div className="charro-admin__tabs" role="tablist" aria-label="Secciones del panel">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`charro-admin__tab ${activeTab === tab.id ? "charro-admin__tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="charro-auth__card charro-admin__panel">
          {activeTab === "users" ? <UsersTab /> : <NotificationsTab />}
        </div>

        <div className="charro-admin__signout">
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="btn-charro-outline px-8 py-3"
          >
            {signingOut ? "Cerrando sesión…" : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </CharroOnboardingShell>
  );
}
