import { useQuery } from '@tanstack/react-query';
import { type Account } from '@/lib/types';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useAccountQuery = () => {
    return useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await axiosInstance.get<Account[]>('/accounts');
            return response.data;
        },
        enabled: true,
    });
};

