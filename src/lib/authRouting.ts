export const CUENTA_BIENVENIDA = "/cuenta/bienvenida";
export const CUENTA_PASAPORTE = "/cuenta/pasaporte";

/** `loggin_first_time: false` → bienvenida; si no, pasaporte. */
export function getPostLoginPath(loggin_first_time?: boolean | null): string {
  return loggin_first_time === false ? CUENTA_BIENVENIDA : CUENTA_PASAPORTE;
}

export function needsWelcome(loggin_first_time?: boolean | null): boolean {
  return loggin_first_time === false;
}

export function parseLogginFirstTime(value: unknown): boolean {
  if (value === true || value === "true" || value === 1) return true;
  if (value === false || value === "false" || value === 0) return false;
  return true;
}

export function extractLogginFirstTime(
  decoded: Record<string, unknown>
): boolean {
  const raw =
    decoded.loggin_first_time ??
    decoded.logginFirstTime ??
    decoded.loginFirstTime ??
    decoded.loggingFirstTime;
  return parseLogginFirstTime(raw);
}
