import { useQuery } from '@tanstack/react-query';
import { type Account } from '@/lib/types';
import axios from 'axios';
import { useMemo } from 'react';

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

export const useDeleteAccountQuery = () => {
    return useQuery({
        queryKey: ['deleted-accounts'],
        queryFn: async () => {
            const response = await axiosInstance.get<Account[]>('/trash');
            return response.data;
        },
    });
};

export const useAccount = () => {
    const { isPending, data } = useAccountQuery();
    const { data: deletedData, isPending: isPendingDeletedData } = useDeleteAccountQuery();

    const accounts = useMemo(() => {
        if (isPending) return [];
        return data;
    }, [data, isPending]);

    const deletedAccounts = useMemo(() => {
        if (isPendingDeletedData) return [];
        return deletedData;
    }, [deletedData, isPendingDeletedData]);

    return { accounts, deletedAccounts, isPending };
};
