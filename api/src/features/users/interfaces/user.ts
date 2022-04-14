export interface user {
  email: string;
  username: string;
  password: string;
  role: role;
}

export type role = "user" | "admin";