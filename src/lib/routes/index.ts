const routes = {
    dashboard: {
        index: '/dashboard',
    },
    accounts: {
        index: '/accounts',
        account: (id: string) => `/accounts/${id}`,
    },
    trash: {
        index: '/trash',
        account: (id: string) => `/trash/${id}`,
    },
};
