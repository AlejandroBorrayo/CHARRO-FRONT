import axios from "axios";

/** Valor por defecto; en producción usar NEXT_PUBLIC_X_API_KEY en .env */
const DEFAULT_API_KEY = "tub_e6c1f2f6-5b7c-4e6e-9e6f-6c5e2f1f3d6g";

export const API_KEY =
  process.env.NEXT_PUBLIC_X_API_KEY?.trim() || DEFAULT_API_KEY;

/**
 * Cliente HTTP centralizado. Importar siempre desde aquí en servicios
 * para que todos los requests incluyan x-api-key automáticamente.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

export { isAxiosError } from "axios";
