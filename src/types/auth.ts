export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseResult {
  accessToken: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponseResult {
  accessToken: string;
}
