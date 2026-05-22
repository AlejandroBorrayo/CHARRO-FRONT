"use client";

import Link from "next/link";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { getPostLoginPath, REGISTRO_PATH } from "@/lib/authRouting";
import { CharroAuthShell } from "@/components/charro/CharroAuthShell";
import { CharroField } from "@/components/charro/CharroField";
import { CharroFormMessage } from "@/components/charro/CharroFormMessage";
import { isValidEmail } from "@/components/charro/charro-form-utils";

export function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!form.email.trim() || !form.password) {
      setError("Correo y contraseña son obligatorios");
      return;
    }

    if (!isValidEmail(form.email)) {
      const msg = "Ingresa un correo electrónico válido";
      setEmailError(msg);
      setError(msg);
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    let logginFirstTime: boolean | undefined;
    for (let i = 0; i < 8; i++) {
      const session = await getSession();
      if (session?.user) {
        logginFirstTime = session.user.loggin_first_time;
        break;
      }
      await new Promise((r) => setTimeout(r, 120));
    }

    window.location.assign(getPostLoginPath(logginFirstTime));
  };

  return (
    <CharroAuthShell
      title="Iniciar sesión"
      subtitle="Bienvenido de vuelta a la familia que celebra la vida."
      footer={
        <p className="text-sm text-[var(--charro-muted)]">
          ¿Aún no tienes cuenta?{" "}
          <Link href={REGISTRO_PATH} className="btn-charro-outline !inline py-1">
            Crear cuenta
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="charro-auth__form">
        <CharroField
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          error={emailError}
        />

        <CharroField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />

        {error && <CharroFormMessage variant="error">{error}</CharroFormMessage>}

        <button type="submit" disabled={loading} className="btn-charro mt-2">
          {loading ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </CharroAuthShell>
  );
}
