import { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios';
import { parseApiError } from '../utility/errorParser';
import { getCommonHeaders } from './config/getCommonHeaders';
import { useUserStore } from '../store/userStore';
import { resetToAuthNavigator } from '../Naviagtor/rootNavigation';

let isHandlingSessionKickout = false;

export const setupInterceptors = (apiClient: AxiosInstance) => {
  const getToken = async (): Promise<string | null> => {
    try {
      const { token } = useUserStore.getState();
      return token;
    } catch (error) {
      console.error('Error getting token from storage:', error);
      return null;
    }
  };

  apiClient.interceptors.request.use(
    async config => {
      const commonHeaders = await getCommonHeaders();
      const headers = AxiosHeaders.from(config.headers);

      Object.entries(commonHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      const token = await getToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      config.headers = headers;
      return config;
    },
    error => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => {
      const parsed = parseApiError(error);
      const requestUrl = String(error?.config?.url ?? '');
      const isAuthRequest = requestUrl.includes('/auth/');

      if (
        (parsed.status === 401 || parsed.status === 408) &&
        !isAuthRequest &&
        !isHandlingSessionKickout
      ) {
        isHandlingSessionKickout = true;
        // Clear user state and navigate back to Auth
        await useUserStore.getState().logout();
        resetToAuthNavigator();
        // Reset the flag after a short delay so future 401s are handled
        setTimeout(() => {
          isHandlingSessionKickout = false;
        }, 3000);
      }

      return Promise.reject(parsed);
    },
  );
};
