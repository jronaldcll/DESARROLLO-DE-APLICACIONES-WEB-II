export interface User {
  [prop: string]: unknown;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: { name: string; priority: number }[];
  permissions?: string[];
}

export interface Token {
  [prop: string]: unknown;

  access_token: string;
  token_type?: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}
