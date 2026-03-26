import { useApiMutation } from './queries/useApiMutation';
import { useApiQuery } from './queries/useApiQuery';
import { ENDPOINTS } from '../Api/config/endPoint';

export function useLogin(options?: any) {
  return useApiMutation(ENDPOINTS.auth.login, 'post', [], options);
}

export function useRegister(options?: any) {
  return useApiMutation(ENDPOINTS.auth.register, 'post', [], options);
}

export function useGetUserInfo(email: string, options?: any) {
  return useApiQuery(
    ['user-info', email],
    ENDPOINTS.auth.info,
    { params: { email }, enabled: !!email, ...options }
  );
}
