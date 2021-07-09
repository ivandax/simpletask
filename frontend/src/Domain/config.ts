export type Config = {
    users: {
        register: string;
        verify: string;
        login: string;
        validateSession: string;
    };
    variables: {
        cookieName: string;
    };
};
