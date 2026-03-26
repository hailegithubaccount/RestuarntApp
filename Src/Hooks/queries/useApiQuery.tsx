import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import apiClient from '../../api/config/apiClient';
import { ApiQueryOptions } from '../../api/types/auth';

/**
 * Generic TanStack Query hook for GET requests.
 * @param key - Query key (string or array) for caching
 * @param url - API endpoint
 * @param options - Optional query options
 */
export function useApiQuery<TData = any>(
  key: QueryKey,
  url: string,
  options?: ApiQueryOptions<TData>,
) {
  return useQuery<TData>({
    queryKey: key,
    retry: 3,
    retryDelay: 3000,
    queryFn: async () => {
      try {
        if (__DEV__) {
          console.log(
            '[useApiQuery][GET]',
            url,
            options?.params ? { params: options.params } : '',
          );
        }
        // console.log(' API HIT:', url);
        // const response = await apiClient.get<TData>(url);
        const response = await apiClient.get<TData>(url, {
          params: options?.params,
        });

        return response.data;
      } catch (e: any) {
        if (__DEV__) {
          console.log('[useApiQuery][GET][ERROR]', url, {
            message: e?.message,
            status: e?.response?.status,
            data: e?.response?.data,
          });
        }
        throw e;
      }
    },
    ...options,
  });
}
