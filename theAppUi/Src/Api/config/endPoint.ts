export const DEV_BASE_URL = 'https://backendforpronative.onrender.com/api';

const AUTH_PREFIX = '/auth';
const TABLES_PREFIX = '/tables';
const COFFEES_PREFIX = '/coffees';
const ORDERS_PREFIX = '/orders';

export const ENDPOINTS = {
  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`,
    info: `${AUTH_PREFIX}/info`,
    // preserved from previous setup
    preLogin: `${AUTH_PREFIX}/pre-login`,
    device_lookup: `${AUTH_PREFIX}/device-lookup`,
    verify_otp: `${AUTH_PREFIX}/verify-login`,
    set_pin: `${AUTH_PREFIX}/set-pin`,
    forget_pin: `${AUTH_PREFIX}/forgot-pin`,
    forget_pin_verify_otp: `${AUTH_PREFIX}/verify-forgot-pin`,
    forget_pin_reset: `${AUTH_PREFIX}/set-forgot-pin`,
    change_pin: `${AUTH_PREFIX}/change-pin`,
    resend_otp: `/auth/resend-otp`,
  },
  tables: {
    base: `${TABLES_PREFIX}`,
    byQr: `${TABLES_PREFIX}/by-qr`,
  },
  coffees: {
    all: `${COFFEES_PREFIX}/all`,
    base: `${COFFEES_PREFIX}`,
  },
  orders: {
    base: `${ORDERS_PREFIX}`,
  },
  Wallet: {
    balance: '/wallet/emoney/wallet-balance',
  },
} as const;
