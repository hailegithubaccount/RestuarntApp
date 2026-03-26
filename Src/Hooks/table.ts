import { useApiQuery } from './queries/useApiQuery';
import { ENDPOINTS } from '../api/config/endPoint';

export function useGetTable(tableNumber: string, enabled: boolean = false, options?: any) {
  return useApiQuery(
    ['table-lookup', tableNumber],
    `${ENDPOINTS.tables.byQr}/${tableNumber}`,
    {
      enabled: !!tableNumber && enabled,
      staleTime: 0,
      ...options,
    }
  );
}
