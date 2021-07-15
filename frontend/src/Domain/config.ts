export type Config = {
    users: {
        register: string;
        verify: string;
        login: string;
        logout: string;
        validateSession: string;
        passwordRecovery: string;
        setNewPassword: string;
        userInfo: string;
    };
    variables: {
        cookieName: string;
    };
};
