export interface UserRow {
  id: number;
  email: string;
  password: string;
  created_on: Date;
  updated_on: Date;
}

export type UserLoginRow = Pick<UserRow, "id" | "email" | "password">;

export interface RegisterParams {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
