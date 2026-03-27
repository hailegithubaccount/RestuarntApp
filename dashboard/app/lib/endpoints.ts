export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    info: '/auth/info',
  },
  coffees: {
    all: '/coffees/all',
    base: '/coffees',
  },
  tables: {
    base: '/tables',
    byQr: '/tables/by-qr',
  },
  orders: {
    base: '/orders',
  },
  stats: {
    base: '/stats',
  },
} as const;
