"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CharroCommunityInvite } from "@/components/charro/CharroCommunityInvite";
import { LOGIN_PATH } from "@/lib/authRouting";
import { CharroOnboardingShell } from "@/components/charro/CharroOnboardingShell";
import { CharroFormMessage } from "@/components/charro/CharroFormMessage";
import { getUser } from "@/services/user";
import type { UserCollectionInterface } from "@/type/user.interface";

function formatFullName(user: UserCollectionInterface | null) {
  if (!user) return "—";
  const parts = [
    user.first_name,
    user.paternal_last_name,
    user.maternal_last_name,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
}

function formatBirthDate(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso.includes("T") ? iso : `${iso}T12:00:00`);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatGender(code?: string) {
  if (code === "m") return "Masculino";
  if (code === "f") return "Femenino";
  return "—";
}

function formatIssuedAt(createdAt?: Date | string) {
  if (!createdAt) {
    return new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  try {
    const d = new Date(createdAt);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function CharroPassport() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserCollectionInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  const userId = session?.user?.sub;

  useEffect(() => {
    if (status !== "authenticated" || !userId) {
      if (status === "unauthenticated") setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    getUser(userId)
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError("No pudimos cargar tu pasaporte. Intenta recargar la página.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, userId]);

  const fullName = useMemo(() => formatFullName(user), [user]);
  const memberId = user?._id?.slice(-8).toUpperCase() ?? "--------";
  const issuedAt = useMemo(() => formatIssuedAt(user?.created_at), [user?.created_at]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: LOGIN_PATH });
  };

  return (
    <CharroOnboardingShell
      eyebrow="Tu identidad"
      title="Pasaporte de la Comunidad"
      subtitle="Tu credencial simbólica como embajador de la cultura mexicana. Guárdala con orgullo."
    >
      {error && (
        <motion.div className="mb-4">
          <CharroFormMessage variant="error">{error}</CharroFormMessage>
        </motion.div>
      )}

      {loading ? (
        <div className="charro-passport charro-passport--loading" aria-busy="true">
          <p className="charro-passport__loading-text">Preparando tu pasaporte…</p>
        </div>
      ) : (
        <motion.div
          className="charro-passport"
          initial={{ rotateY: -8, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="charro-passport__shine" aria-hidden />
          <header className="charro-passport__header">
            <div className="charro-passport__emblem" aria-hidden>
              <span>🇲🇽</span>
            </div>
            <div>
              <p className="charro-passport__state">Estados Unidos Mexicanos</p>
              <h3 className="charro-passport__doc-type">Pasaporte Comunidad Charro</h3>
              <p className="charro-passport__issuer">
                El Charro González · Embajador cultural
              </p>
            </div>
          </header>

          <div className="charro-passport__body">
            <div className="charro-passport__photo">
              <span className="charro-passport__photo-ring" aria-hidden />
              <span className="charro-passport__initials">{initials(fullName)}</span>
            </div>

            <dl className="charro-passport__fields">
              <div className="charro-passport__field charro-passport__field--wide">
                <dt>Apellidos y nombre</dt>
                <dd>{fullName}</dd>
              </div>
              <div className="charro-passport__field">
                <dt>Nacionalidad</dt>
                <dd>Mexicana</dd>
              </div>
              <div className="charro-passport__field">
                <dt>Sexo</dt>
                <dd>{formatGender(user?.gender)}</dd>
              </div>
              <div className="charro-passport__field">
                <dt>Fecha de nacimiento</dt>
                <dd>{formatBirthDate(user?.birth_date)}</dd>
              </div>
              <div className="charro-passport__field charro-passport__field--wide">
                <dt>Correo</dt>
                <dd>{user?.email ?? session?.user?.email ?? "—"}</dd>
              </div>
              <div className="charro-passport__field">
                <dt>WhatsApp</dt>
                <dd>{user?.whatsapp ?? "—"}</dd>
              </div>
              <div className="charro-passport__field">
                <dt>No. de miembro</dt>
                <dd className="charro-passport__mono">CH-{memberId}</dd>
              </div>
              <div className="charro-passport__field">
                <dt>Fecha de emisión</dt>
                <dd>{issuedAt}</dd>
              </div>
            </dl>
          </div>

          <footer className="charro-passport__footer">
            <div className="charro-passport__barcode" aria-hidden>
              {Array.from({ length: 42 }).map((_, i) => (
                <span
                  key={i}
                  style={{ height: `${40 + ((i * 7) % 55)}%` }}
                />
              ))}
            </div>
            <p className="charro-passport__motto">
              Celebramos la vida · Honramos nuestras raíces
            </p>
          </footer>
        </motion.div>
      )}

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-10"
        aria-labelledby="comunidad-charro-heading"
      >
        <p id="comunidad-charro-heading" className="charro-auth__eyebrow mb-5 text-center">
          Comunidad Charro
        </p>
        <CharroCommunityInvite />
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex justify-center"
      >
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="btn-charro-outline px-8 py-3"
        >
          {signingOut ? "Cerrando sesión…" : "Cerrar sesión"}
        </button>
      </motion.div>
    </CharroOnboardingShell>
  );
}
