
import { date } from 'yup';
import { ORDER_URL, TABLE_URI } from '../../../constant';
import {COFFE_URL } from '../../../constant'

export const GetTableByQR$ = async (tableNumber: string) => {
  return TABLE_URI.get(`/by-qr/${tableNumber}`);
};




export const FetchCoffe$ = async()=>{
  return  COFFE_URL.get('/all')
} 



export const orderCoffe$ =async(date:any)=>{
  return ORDER_URL.post('/')
}


export const FetchCoffeCatagorically$ = async (category:any) => {
  return COFFE_URL.get('/', { params: category ? { category } : {} });
};

