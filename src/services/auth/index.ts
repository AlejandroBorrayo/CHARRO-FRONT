import type { CreateUserPayload } from "@/type/register.interface";
import { apiClient, isAxiosError } from "@/lib/apiClient";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: Record<string, string[]> }
      | undefined;

    if (data?.errors && typeof data.errors === "object") {
      const details = Object.values(data.errors).flat().filter(Boolean);
      if (details.length > 0) return details.join(". ");
    }

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
  }
  return fallback;
}

export const registerCharro = async (payload: CreateUserPayload) => {
  const { data } = await apiClient.post("/user", payload);
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await apiClient.post<{ access_token: string }>(
    "/auth/login",
    { email: email.trim().toLowerCase(), password }
  );
  return data;
};

export const recoveryPassword = async (email: string) => {
  const { data } = await apiClient.post("/auth/recovery-password", { email });
  return data;
};

export const resetPassword = async (token: string, new_password: string) => {
  const { data } = await apiClient.post("/auth/reset-password", {
    new_password,
    token,
  });
  return data;
};
