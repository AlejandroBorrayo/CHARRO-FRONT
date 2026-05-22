/** Campos del formulario de registro (UI en español) */
export interface CharroRegisterForm {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  genero: "" | "f" | "m";
  email: string;
  whatsapp: string;
  password: string;
}

/** Body esperado por POST /user (CreateUserDto) */
export interface CreateUserPayload {
  first_name: string;
  paternal_last_name: string;
  maternal_last_name: string;
  birth_date: string;
  gender: "f" | "m";
  email: string;
  whatsapp: string;
  password: string;
  confirm_password: string;
}
