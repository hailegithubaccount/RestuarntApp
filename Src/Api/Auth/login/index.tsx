
import { AUTH_URI } from '../../../constant';

export const Login$ = async (data: any) => {
  return AUTH_URI.post('/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};



