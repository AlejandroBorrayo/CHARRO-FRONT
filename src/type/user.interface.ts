export type GenderEnum = "f" | "m";

export interface UserCollectionInterface {
  readonly _id?: string;
  readonly first_name: string;
  readonly paternal_last_name: string;
  readonly maternal_last_name: string;
  readonly birth_date: string;
  readonly gender: GenderEnum;
  readonly email: string;
  readonly whatsapp: string;
  readonly password?: string;
  readonly role: string;
  readonly no_passport?: string;
  readonly company_id?: string;
  readonly loggin_first_time?: boolean;
  readonly deleted: boolean;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
}
