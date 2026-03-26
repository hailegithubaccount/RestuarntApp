export type WalletBalanceItem = {
  id: string;
  owner_id: string;
  currency: string;
  balance: number;
  metadata: Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type WalletBalanceResponse = {
  status: string;
  timestamp: string;
  message: string;
  data: WalletBalanceItem[];
};
