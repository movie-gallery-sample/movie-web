export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseResult {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponseResult {
  accessToken: string;
}

export interface User {
  id?: string;
  email?: string;
  accessToken?: string;
}
