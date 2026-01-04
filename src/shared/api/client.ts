import { useSseStore } from '@/processes/sse-session';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let refreshSubscribers: Array<(err?: unknown) => void> = [];

function addRefreshSubscriber(cb: (err?: unknown) => void) {
  refreshSubscribers.push(cb);
}

function onAccessTokenFetched() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

function onRefreshFailed(err: unknown) {
  refreshSubscribers.forEach((cb) => cb(err));
  refreshSubscribers = [];
}
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10_000,
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, value as string);
      }
    });
    return searchParams.toString();
  },
});

export const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10_000,
});

export function isAuthEndpoint(url?: string) {
  if (!url) return false;

  try {
    const { pathname } = new URL(url, 'http://dummy');
    return pathname.startsWith('/auth/');
  } catch {
    return url.startsWith('/auth/');
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (isAuthEndpoint(originalRequest?.url)) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refresh 동시성 제어
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber(() => {
            apiClient(originalRequest).then(resolve).catch(reject);
          });
        });
      }

      isRefreshing = true;

      try {
        await refreshClient.post('/auth/refresh');
        useSseStore.getState().bump();
        onAccessTokenFetched();

        return apiClient(originalRequest);
      } catch (refreshError) {
        onRefreshFailed(refreshError);
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
