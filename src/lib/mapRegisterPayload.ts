import { normalizeWhatsApp } from "@/components/charro/charro-form-utils";
import type {
  CharroRegisterForm,
  CreateUserPayload,
} from "@/type/register.interface";

export function mapRegisterFormToPayload(
  form: CharroRegisterForm,
  confirmPassword: string
): CreateUserPayload {
  return {
    first_name: form.nombres.trim(),
    paternal_last_name: form.apellido_paterno.trim(),
    maternal_last_name: form.apellido_materno.trim(),
    birth_date: form.fecha_nacimiento,
    gender: form.genero as "f" | "m",
    email: form.email.trim().toLowerCase(),
    whatsapp: normalizeWhatsApp(form.whatsapp),
    password: form.password,
    confirm_password: confirmPassword,
  };
}
