export type Config = {
    users: {
        register: string;
        verify: string;
        login: string;
        validateSession: string;
        passwordRecovery: string;
        setNewPassword: string;
    };
    variables: {
        cookieName: string;
    };
};
