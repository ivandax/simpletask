import { DefaultError } from "Domain/error";

const mapError = (error: DefaultError, fallback?: string): string => {
    switch (error.error) {
        case "invalid password":
            return "Invalid Password";
        case "email is wrong":
            return "The email account is wrong";
        case "recover password - db insertion problem":
            return "Oops... something went wrong";
        default:
            return fallback === undefined ? error.error : fallback;
    }
};

export { mapError };
