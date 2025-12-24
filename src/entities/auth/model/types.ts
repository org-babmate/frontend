export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface CommonResponse {
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface ResetPassword {
  token: string;
  password: string;
}

export interface FindPassword {
  email: string;
}
