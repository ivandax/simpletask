import { Config } from "Domain/config";

export { config };

const url = "http://localhost:3001/api";

const config: Config = {
    users: {
        register: `${url}/users/register`,
        verify: `${url}/users/verify`,
        login: `${url}/users/login`,
        validateSession: `${url}/users/validate-session`,
    },
    variables: {
        cookieName: "simpletask-session",
    },
};
