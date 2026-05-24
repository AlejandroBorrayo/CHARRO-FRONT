import type { UserCollectionInterface } from "@/type/user.interface";

export function formatFullName(user: Pick<
  UserCollectionInterface,
  "first_name" | "paternal_last_name" | "maternal_last_name"
> | null) {
  if (!user) return "—";
  const parts = [
    user.first_name,
    user.paternal_last_name,
    user.maternal_last_name,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
}

export function formatBirthDate(iso?: string) {
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

export function formatGender(code?: string) {
  if (code === "m") return "Masculino";
  if (code === "f") return "Femenino";
  return "—";
}

export function formatDateTime(value?: Date | string) {
  if (!value) return "—";
  try {
    const d = new Date(value);
    return d.toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(value);
  }
}

export function formatRole(role?: string) {
  if (role === "admin") return "Administrador";
  if (role === "fan") return "Fan";
  if (role === "user") return "Usuario";
  return role ?? "—";
}
