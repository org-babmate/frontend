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
