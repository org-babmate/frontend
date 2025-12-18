import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;

const refreshSubscribers: Array<() => void> = [];

function addRefreshSubscriber(cb: () => void) {
  refreshSubscribers.push(cb);
}

function onAccessTokenFetched() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers.length = 0;
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

// 요청 인터셉터: zustand에서 token 읽어와서 붙이기
// apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) {
//     attachAuthHeader(config, token);
//   }
//   return config;
// });

// 응답 인터셉터: 401 → refresh 재발급 → 원래 요청 재시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

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
        await apiClient.post('/auth/refresh');

        onAccessTokenFetched();

        return apiClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
