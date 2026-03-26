import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type ILoginRequest = {
  login_pin: string;
  device_id: string;
};

export interface ApiMutationOptions<TData, TVariables>
  extends UseMutationOptions<TData, unknown, TVariables> {
  headers?: Record<string, string>;
}

// export interface ApiQueryOptions<T> extends UseQueryOptions<T> {
//   params?: Record<string, any>;
// }
export type ApiQueryOptions<TData> = Omit<
  UseQueryOptions<TData>,
  'queryKey'
> & {
  queryKey?: QueryKey;
  params?: Record<string, any>;
};

// export interface ApiQueryOptions<T> extends UseQueryOptions<T> {}

export type AccountLookUpRequest = {
  account_number?: string;
  user_id?: string;
  service_bool?: boolean;
};

export type AccountLookUpResponse = {
  status: number;
  message: string;
  data: {
    account_number: string;
    customer_id: string;
    customer_name: string;
    phone_number: string;
    balance?: string;
    currency: string;
    account_type: string;
    restriction: 'YES' | 'NO';
    restriction_type?: 'CREDIT' | 'ALL';
    customer_segment: string;
    [key: string]: any;
  };
};

export interface IUser {
  access_token?: string;
  token?: string;
  temp_token?: string;
  user_id?: string;
  user_code?: string;
  full_name?: string;
  phone_number?: string;
  avatar?: string;
  image_url?: string;
  kyc_level?: number;
  account_type?: string;
  is_activated?: boolean;
  budget_enabled?: boolean;
  device_uuid?: string;
  linked_accounts?: string[];
  services?: string[];
  excluded_access_list?: ServicesKeys[] | string[];
  parsed_linked_accounts?: ILinkedAccount[];
  parsed_services?: IServiceList[];
  minimum_required_balance?: number;
  application_installation_date?: string;
  login_time?: string;
  session_expires?: string;
  expiry?: string;
  token_expiry?: string;
  fcm_token?: string;
  reset_session_id?: string;
  resetSessionId?: string;
  next_step?: string;
  otp?: string | number;
  isSetPin?: boolean;
  has_pin?: boolean;
  pin?: boolean;
  [key: string]: any;
}

export interface ILinkedAccount {
  account_number: string;
  currency: string;
  is_main: boolean;
  account_type: string;
}

export interface IServiceList {
  raw: string;
  service_name: string; // transfer_to_cbe or name
  service_code?: string; // GLOBAL
  max_amount?: number; // 1000000
  min_amount?: number; // 1
  is_allowed?: boolean;
  currency?: string;
  service_key?: string; // your mapped ServicesKeys like "cbe_to_cbe", "topup", ...
}

export type ILoginResponse = {
  status: number;
  message: string;
  data: IUser;
};

export type PreLoginRequest = {
  phone_number: string;
};

export type ForgetPinRequest = {
  phone_number: string;
};

export type ForgetPinResponse = {
  status: number;
  message: string;
  data: IUser;
};

export type ISetPinRequest = {
  login_pin: string;
  device_id: string;
};

export interface ISetPinData {
  userId: string;
  userCode: string;
  userFound: boolean;
  fullName: string;
  phoneNumber: string;
  pinSet: boolean;
  mainAccount: string;
  linkedAccounts: string[];
  accessToken: string;
  tokenType: 'set_pin';
  sessionExpires: string;
}
export type ISetPinResponse = {
  status: number;
  message: string;
  data: IUser;
};

export type ResetPinRequest = {
  login_pin: string;
  device_id: string;
  reset_session_id: string;
  phone_number: string;
};
export type ResetPinResponse = {
  status: number;
  message: string;
  data: IUser & {
    pin_reset?: boolean;
  };
};

export type RegisterRequest = {
  phone: string;
  full_name: string;
};

export type ForgetPinVerifyOTPRequest = {
  code: string;
  reset_session_id?: string;
};
export type ForgetPinVerifyOTPResponse = {
  status: number;
  message: string;
  data: IUser & {
    token_type?: string;
  };
};

export type ChangePinRequest = {
  old_pin: string;
  new_pin: string;
};

export type ChangePinResponse = {
  status: number;
  message: string;
  data: {
    pin_changed: boolean;
    [key: string]: any;
  };
};

export type ICheckPinStrengthRequest = {
  pin: string;
  from?: string;
};

export type ICheckPinStrengthResponse = {
  status: number;
  message: string;
  data: {
    strong: true;
  };
};

export type OldPinCheckerRequest = {
  old_pin: string;
};

export type OldPinCheckerResponse = {
  status: number;
  message: string;
  data: {
    [key: string]: any;
  };
};

export type VerifyPinRequest = {
  pin: string;
  data_token?: string;
  is_loan?: boolean;
  is_pin_verify_only?: boolean;
};

export type VerifyPinResponse = {
  status: number;
  message: string;
  data: {
    [key: string]: any;
  };
};

export type VerifyOTPRequest = {
  code: string;
};

export type VerifyOTPResponse = {
  status: string | number;
  timestamp?: string;
  message: string;
  data: IUser;
};

export type ResendOTPRequest = {
  phone_number: string;
  otpFor?: string;
};

export type ResendOTPResponse = {
  status: string | number;
  message: string;
  data: any;
};
export type RegisterResponse = {
  status: number;
  message: string;
  data?: {
    // data itself might be missing
    next_step?: string;
    registration_complete?: boolean;
    temp_token?: string;
    session_expires?: string;
    token_type?: string;
    user_id?: string;
    [key: string]: any; // optional: allow extra fields that may appear
  };
};

export interface PreLoginResponse {
  status: number;
  message: string;
  data: IUser & {
    access_token?: string;
    otp?: string | number;
    isSetPin?: boolean;
  };
}

export type DeviceLookupResponse = {
  status: number;
  message: string;
  data: {
    device_found: boolean;
    next_step: string;
    token?: string;
  };
};

export interface IActivatedAccountData {
  _id: string;
  activation_code: string;
  full_name: string;
  phone_number: string;
  device_uuid: string;
  account_number: string[];
  channel: string;
  created_at: string;
  last_modified_at: string;
  temp_token: string;
  customer_segment: string;
  minimum_pin_length: string;
  maximum_pin_length: string;
}

export interface IAccountActivationResponse {
  status: number;
  message: string;
  data: IActivatedAccountData;
}

export enum ActivationSource {
  LEGACY_APP = 'LEGACY_APP',
  BRANCH = 'BRANCH',
  USSD = 'USSD',
}

export enum ServicesKeys {
  WALLET = 'wallet',
  CBE_TO_CBE = 'cbe_to_cbe',
  TELEBIRR = 'telebirr',
  MPESA = 'mpesa',
  CBE_BIRR = 'cbe_birr',
  TOPUP = 'topup',
  ETHIO_TELECOM_TOP_UP = 'ethio_telecom_topup',
  SAFARICOM_TOP_UP = 'safaricom_topup',
  MONEY_REQUEST = 'money_request',
  CHAT_MONEY_REQUEST = 'chat_money_request',
  CHAT_TOP_UP = 'chat_topup',
  CHAT_ETHIO_TELECOM_TOP_UP = 'chat_ethio_telecom_topup',
  CHAT_SAFARICOM_TOP_UP = 'chat_safaricom_topup',
  CHAT_CBE_TO_CBE = 'chat_cbe_to_cbe',
  BILL_PAYMENT = 'bill_payment',
  DONATION = 'donation',
  IPS = 'ips',
  VOUCHER = 'voucher',
  UTILITY = 'utility',
  MERCHANT = 'merchant',
  CHAT = 'chat',
  SCHEDULED_PAYMENT = 'scheduled_payment',
  SITOTA = 'sitota',
  BUDGET = 'budget',
  BENEFICIARY = 'beneficiary',
  MINI_STATEMENT = 'mini_statement',
  MINI_APPS = 'mini_apps',
  BALANCE_VIEW = 'balance_view',
  QR_PAYMENT = 'qr_payment',
  SPLIT_BILL = 'split_bill',
  SELF_TRANSFER = 'self_transfer',
  NEWS = 'news',
  MAP = 'map',
  PAYMENT_VERIFICATION = 'payment_verification',
  EXCHANGE_RATE = 'exchange_rate',
  TRANSACTION_LIST = 'transaction_list',
  MICRO_FINANCE = 'micro_finance',
  VIRTUAL_CARD = 'virtual_card',
  ECOMMERCE = 'ecommerce',
  EVENTS = 'events',
  QUICK_PAY_CBE = 'quick_pay_cbe',
  QUICK_PAY_START_PAY = 'quick_pay_star_pay',
  QUICK_PAY_IPS = 'quick_pay_ips',
  LOCKED_AMOUNT = 'locked_amount',
  QUICK_PAY_QR = 'quick_pay_qr',
}

export interface IAccessList {
  access_list: ServicesKeys;
}

export interface IAccountActivationRequest {
  activation_code: string;
  source: ActivationSource;
}
export interface IChangeMainAccountRequest {
  main_account: string;
}
