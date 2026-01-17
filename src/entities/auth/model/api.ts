import { apiClient } from '@/shared/api/client';
import type {
  AuthResponse,
  CommonResponse,
  FindPassword,
  LoginPayload,
  ResetPassword,
  SignupPayload,
} from './types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/auth/login', payload);
  return res.data;
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const registerResponse = await apiClient.post<AuthResponse>('/auth/register', payload);
  return registerResponse.data;
}

export async function emailResend(payload: { email: string }): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/auth/resend-verification', payload);
  return res.data;
}
export async function logout(): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/auth/logout');
  return res.data;
}

export async function resetPassword({ password }: ResetPassword): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/auth/reset-password', { password });
  return res.data;
}

export async function findPassword({ email }: FindPassword): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/auth/reset-password', email);
  return res.data;
}
