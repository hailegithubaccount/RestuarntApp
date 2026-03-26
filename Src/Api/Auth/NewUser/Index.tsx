// checkDevice.ts
import { AUTH_URI,AUTH_URI_INTERCEPT } from '../../../constant';


export const Register$ = async (data: any,) => {
  return AUTH_URI.post('/register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};



export const registerUser$ = async (
  data: any,
  publicKey: any,
) => {
  return AUTH_URI_INTERCEPT(publicKey).post('/register', data, {
    headers: {
      'Content-Type': 'application/json',
     
    },
  });
};

