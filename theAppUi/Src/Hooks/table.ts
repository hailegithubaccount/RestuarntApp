import { useApiQuery } from './queries/useApiQuery';
import { useApiMutation } from './queries/useApiMutation';
import { ENDPOINTS } from '../Api/config/endPoint';

export type TableQrItem = {
  _id?: string;
  tableNumber: number;
  qrCodeUrl: string;
};

export type CreateTableQrPayload = {
  tableNumber: number;
};

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

export function useGetTables(options?: any) {
  return useApiQuery<TableQrItem[]>(['tables'], ENDPOINTS.tables.base, {
    staleTime: 0,
    ...options,
  });
}

export function useCreateTableQr(options?: any) {
  return useApiMutation<TableQrItem, CreateTableQrPayload>(
    ENDPOINTS.tables.base,
    'post',
    [['tables']],
    options,
  );
}
