import axiosInstance from './axios';
import {IAccount} from '@/types/api';

/**
 * Fetch account details
 */
export const fetchAccount = async (): Promise<IAccount> => {
  const response = await axiosInstance.get('/account');
  return response.data;
};

