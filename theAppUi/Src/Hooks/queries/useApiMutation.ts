import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { ApiMutationOptions } from '../../api/types/auth';
import apiClient from '../../Api/config/apiClient';

/**
 * Generic TanStack Query mutation hook for POST/PUT/DELETE requests.
 * Handles cache invalidation automatically on success.
 *
 * @param url - API endpoint
 * @param method - HTTP method (default: "post")
 * @param invalidateKeys - List of query keys to invalidate on success
 * @param options - Optional mutation options
 */
export function useApiMutation<TData = any, TVariables = any>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  invalidateKeys: QueryKey[] = [],
  options?: ApiMutationOptions<TData, TVariables>,
) {
  const queryClient = useQueryClient();
  // const includeInstallDate = options?.includeInstallDate ?? false;
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const { otpFor, ...data } = variables as any;
      const headers = { ...options?.headers };
      if (otpFor) {
        headers['otp-for'] = otpFor;
      }
      const response = await apiClient.request<TData>({
        url,
        method,
        data,
        headers,
      });
      return response.data;
    },
    onSuccess: (...args) => {
      invalidateKeys.forEach(key =>
        queryClient.invalidateQueries({ queryKey: key }),
      );
      options?.onSuccess?.(...args);
    },

    ...options,
  });
}
