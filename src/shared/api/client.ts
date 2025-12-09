import { AuthResponse } from '@/entities/auth/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 요청이 여러개일때 등록
function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

//등록된 보류 요청들 재실행
function onAccessTokenFetched(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Authorization 헤더 안전하게 세팅
// function attachAuthHeader(config: InternalAxiosRequestConfig, token: string) {
//   if (!config.headers) {
//     config.headers = new AxiosHeaders();
//   }

//   if (config.headers instanceof AxiosHeaders) {
//     config.headers.set('Authorization', `Bearer ${token}`);
//   } else {
//     (config.headers as any).Authorization = `Bearer ${token}`;
//   }
// }

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10_000,
});

// 요청 인터셉터: zustand에서 token 읽어와서 붙이기
// apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) {
//     attachAuthHeader(config, token);
//   }
//   return config;
// });

// // 응답 인터셉터: 401 → refresh 재발급 → 원래 요청 재시도
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const status = error.response?.status;
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // 이미 refresh 중이면 기다렸다가 새 토큰으로 재시도
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           addRefreshSubscriber((newToken: string) => {
//             attachAuthHeader(originalRequest, newToken);
//             resolve(apiClient(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         //Refresh 요청
//         const refreshResponse = await axios.post<AuthResponse>(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
//           {},
//           { withCredentials: true },
//         );

//         const { accessToken, refreshToken } = refreshResponse.data;

//         //토큰 없을시 다시 로그인 요청
//         if (!accessToken || !refreshToken) {
//           if (typeof window !== 'undefined') {
//             window.location.href = '/login';
//           }
//           return;
//         }
//         useAuthStore.getState().setAccessToken({ accessToken, refreshToken });

//         apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//         onAccessTokenFetched(accessToken);
//         attachAuthHeader(originalRequest, accessToken);

//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.getState().clearAuth();
//         if (typeof window !== 'undefined') {
//           window.location.href = '/login';
//         }
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );
