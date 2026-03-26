import { useApiQuery } from './queries/useApiQuery';
import { useApiMutation } from './queries/useApiMutation';
import { ENDPOINTS } from '../Api/config/endPoint';

export function useGetCoffee(category?: string, options?: any) {
  const url = category && category !== 'All' ? ENDPOINTS.coffees.base : ENDPOINTS.coffees.all;
  const params = category && category !== 'All' ? { category } : undefined;
  
  return useApiQuery(
    ['coffee', category],
    url,
    { params, ...options }
  );
}

export function useOrderCoffee(options?: any) {
  return useApiMutation(ENDPOINTS.orders.base, 'post', [], options);
}
