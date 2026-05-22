/** Secreto para firmar sesiones JWT de NextAuth (requiere NEXTAUTH_SECRET). */
export function getAuthSecret(): string {
  const secret =
    process.env.NEXTAUTH_SECRET?.trim() ||
    process.env.NEXT_AUTH_SECRET?.trim() ||
    process.env.NEXT_JWT_SECRET?.trim();

  if (!secret) {
    throw new Error(
      "Falta NEXTAUTH_SECRET en .env (NextAuth no puede crear la sesión)."
    );
  }

  return secret;
}
