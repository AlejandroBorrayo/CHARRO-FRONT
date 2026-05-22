"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CharroAuthShell } from "@/components/charro/CharroAuthShell";
import { CharroField } from "@/components/charro/CharroField";
import { CharroFormMessage } from "@/components/charro/CharroFormMessage";
import {
  isValidEmail,
  isValidGender,
  isValidWhatsApp,
  MIN_PASSWORD_LENGTH,
  normalizeWhatsApp,
  WHATSAPP_DIGITS,
} from "@/components/charro/charro-form-utils";
import { mapRegisterFormToPayload } from "@/lib/mapRegisterPayload";
import { getApiErrorMessage, registerCharro } from "@/services/auth";
import type { CharroRegisterForm } from "@/type/register.interface";

const GENERO_OPTIONS = [
  { value: "", label: "Selecciona una opción" },
  { value: "m", label: "Masculino" },
  { value: "f", label: "Femenino" },
];

const initialForm: CharroRegisterForm = {
  nombres: "",
  apellido_paterno: "",
  apellido_materno: "",
  fecha_nacimiento: "",
  genero: "",
  email: "",
  whatsapp: "",
  password: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    whatsapp?: string;
  }>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      const digits = normalizeWhatsApp(value).slice(0, WHATSAPP_DIGITS);
      setFieldErrors((prev) => ({ ...prev, whatsapp: undefined }));
      setForm((prev) => ({ ...prev, whatsapp: digits }));
      return;
    }

    if (name === "email") {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess(false);

    const required = [
      form.nombres,
      form.apellido_paterno,
      form.apellido_materno,
      form.fecha_nacimiento,
      form.genero,
      form.email,
      form.whatsapp,
      form.password,
      confirmPassword,
    ];

    if (required.some((v) => !v.trim())) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!isValidEmail(form.email)) {
      const msg = "Ingresa un correo electrónico válido";
      setFieldErrors({ email: msg });
      setError(msg);
      return;
    }

    if (!isValidGender(form.genero)) {
      setError("Selecciona un género válido");
      return;
    }

    if (!isValidWhatsApp(form.whatsapp)) {
      const msg = `El WhatsApp debe tener exactamente ${WHATSAPP_DIGITS} dígitos`;
      setFieldErrors({ whatsapp: msg });
      setError(msg);
      return;
    }

    if (form.password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`
      );
      return;
    }

    if (form.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await registerCharro(mapRegisterFormToPayload(form, confirmPassword));
      setSuccess(true);
      setTimeout(() => router.push("/auth/iniciar-sesion"), 1500);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          "No pudimos completar el registro. Verifica tus datos e intenta de nuevo."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CharroAuthShell
      title="Únete a la comunidad"
      subtitle="Celebra la vida y comparte la riqueza de nuestra cultura mexicana."
      footer={
        <p className="text-sm text-[var(--charro-muted)]">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/iniciar-sesion"
            className="btn-charro-outline !inline py-1"
          >
            Iniciar sesión
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="charro-auth__form">
        <CharroField
          label="Nombres"
          name="nombres"
          value={form.nombres}
          onChange={handleChange}
          required
          autoComplete="given-name"
          placeholder="Ej. José Emiliano"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <CharroField
            label="Apellido paterno"
            name="apellido_paterno"
            value={form.apellido_paterno}
            onChange={handleChange}
            required
            autoComplete="family-name"
            placeholder="González"
          />
          <CharroField
            label="Apellido materno"
            name="apellido_materno"
            value={form.apellido_materno}
            onChange={handleChange}
            required
            placeholder="López"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CharroField
            label="Fecha de nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
          />
          <CharroField
            as="select"
            label="Género"
            name="genero"
            value={form.genero}
            onChange={handleChange}
            required
            options={GENERO_OPTIONS}
          />
        </div>

        <CharroField
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          error={fieldErrors.email}
        />

        <CharroField
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          value={form.whatsapp}
          onChange={handleChange}
          required
          autoComplete="tel"
          placeholder="5512345678"
          minLength={WHATSAPP_DIGITS}
          maxLength={WHATSAPP_DIGITS}
          pattern="\d{10}"
          title={`Ingresa ${WHATSAPP_DIGITS} dígitos sin espacios ni guiones`}
          error={fieldErrors.whatsapp}
        />

        <CharroField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          placeholder="Mínimo 8 caracteres"
        />

        <CharroField
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="Repite tu contraseña"
        />

        {error && <CharroFormMessage variant="error">{error}</CharroFormMessage>}
        {success && (
          <CharroFormMessage variant="success">
            ¡Registro exitoso! Te redirigimos al inicio de sesión…
          </CharroFormMessage>
        )}

        <button type="submit" disabled={loading} className="btn-charro mt-2">
          {loading ? "Registrando…" : "Registrarme"}
        </button>
      </form>
    </CharroAuthShell>
  );
}
