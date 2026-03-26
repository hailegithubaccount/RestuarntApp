import { AUTH_URI } from '../../../constant';

export const Fetch$ = async (data: any) => {
  return AUTH_URI.get('/info', { params: data }); // email goes as query param
};



