import { AsyncOp } from "Helpers/asyncOp";
import { DefaultError } from "Domain/error";

export interface RootState {
    userRegistration: AsyncOp<boolean, DefaultError>;
    userVerification: AsyncOp<boolean, DefaultError>;
    userLogin: AsyncOp<boolean, DefaultError>;
    userLogout: AsyncOp<boolean, DefaultError>;
    sessionValidation: AsyncOp<boolean, DefaultError>;
    session: string | null;
    passwordRecovery: AsyncOp<boolean, DefaultError>;
    setNewPassword: AsyncOp<boolean, DefaultError>;
}

const initialRootState: RootState = {
    userRegistration: { status: "pending" },
    userVerification: { status: "pending" },
    userLogin: { status: "pending" },
    userLogout: { status: "pending" },
    sessionValidation: { status: "pending" },
    session: null,
    passwordRecovery: { status: "pending" },
    setNewPassword: { status: "pending" },
};

export enum RootActionType {
    REGISTER_USER = "[ROOT] - REGISTER USER",
    REGISTER_USER_SUCCESS = "[ROOT] - REGISTER USER SUCCESS",
    REGISTER_USER_FAILURE = "[ROOT] - REGISTER USER FAILURE",

    VERIFY_USER = "[ROOT] - VERIFY USER",
    VERIFY_USER_SUCCESS = "[ROOT] - VERIFY USER SUCCESS",
    VERIFY_USER_FAILURE = "[ROOT] - VERIFY USER FAILURE",

    LOGIN_USER = "[ROOT] - LOGIN USER",
    LOGIN_USER_SUCCESS = "[ROOT] - LOGIN USER SUCCESS",
    LOGIN_USER_FAILURE = "[ROOT] - LOGIN USER FAILURE",

    VALIDATE_SESSION = "[ROOT] - VALIDATE SESSION",
    VALIDATE_SESSION_SUCCESS = "[ROOT] - VALIDATE SESSION SUCCESS",
    VALIDATE_SESSION_FAILURE = "[ROOT] - VALIDATE SESSION FAILURE",

    RECOVER_PASSWORD = "[ROOT] - RECOVER PASSWORD",
    RECOVER_PASSWORD_SUCCESS = "[ROOT] - RECOVER PASSWORD SUCCESS",
    RECOVER_PASSWORD_FAILURE = "[ROOT] - RECOVER PASSWORD FAILURE",

    SET_NEW_PASSWORD = "[ROOT] - SET NEW PASSWORD PASSWORD",
    SET_NEW_PASSWORD_SUCCESS = "[ROOT] - SET NEW PASSWORDD SUCCESS",
    SET_NEW_PASSWORD_FAILURE = "[ROOT] - SET NEW PASSWORD FAILURE",

    LOGOUT_USER = "[ROOT] - LOGOUT USER",
    LOGOUT_FAILURE = "[ROOT] - LOGOUT USER FAILURE",
    REMOVE_SESSION = "[ROOT] - REMOVE SESSION",

    NO_OP = "[ROOT] - NO OP",
}

export interface RegisterUserAction {
    type: typeof RootActionType.REGISTER_USER;
    name: string;
    email: string;
    password: string;
}
export interface RegisterUserSuccessAction {
    type: typeof RootActionType.REGISTER_USER_SUCCESS;
    result: boolean;
}
export interface RegisterUserFailureAction {
    type: typeof RootActionType.REGISTER_USER_FAILURE;
    error: DefaultError;
}
export interface VerifyUserAction {
    type: typeof RootActionType.VERIFY_USER;
    email: string;
    token: string;
}
export interface VerifyUserSuccessAction {
    type: typeof RootActionType.VERIFY_USER_SUCCESS;
    result: boolean;
}
export interface VerifyUserFailureAction {
    type: typeof RootActionType.VERIFY_USER_FAILURE;
    error: DefaultError;
}
export interface LoginUserAction {
    type: typeof RootActionType.LOGIN_USER;
    email: string;
    password: string;
}
export interface LoginUserSuccessAction {
    type: typeof RootActionType.LOGIN_USER_SUCCESS;
    token: string;
}
export interface LoginUserFailureAction {
    type: typeof RootActionType.LOGIN_USER_FAILURE;
    error: DefaultError;
}
export interface ValidateSessionAction {
    type: typeof RootActionType.VALIDATE_SESSION;
}
export interface ValidateSessionSuccessAction {
    type: typeof RootActionType.VALIDATE_SESSION_SUCCESS;
    result: string | null;
}
export interface ValidateSessionFailureAction {
    type: typeof RootActionType.VALIDATE_SESSION_FAILURE;
    error: DefaultError;
}
export interface RecoverPasswordAction {
    type: typeof RootActionType.RECOVER_PASSWORD;
    email: string;
}
export interface RecoverPasswordSuccessAction {
    type: typeof RootActionType.RECOVER_PASSWORD_SUCCESS;
    result: boolean;
}
export interface RecoverPasswordFailureAction {
    type: typeof RootActionType.RECOVER_PASSWORD_FAILURE;
    error: DefaultError;
}

export interface SetNewPasswordAction {
    type: typeof RootActionType.SET_NEW_PASSWORD;
    email: string;
    token: string;
    password: string;
}
export interface SetNewPasswordSuccessAction {
    type: typeof RootActionType.SET_NEW_PASSWORD_SUCCESS;
    result: boolean;
}
export interface SetNewPasswordFailureAction {
    type: typeof RootActionType.SET_NEW_PASSWORD_FAILURE;
    error: DefaultError;
}

export interface LogoutUserAction {
    type: typeof RootActionType.LOGOUT_USER;
    session: string;
}
export interface LogoutUserFailureAction {
    type: typeof RootActionType.LOGOUT_FAILURE;
    error: DefaultError;
}
export interface RemoveSessionAction {
    type: typeof RootActionType.REMOVE_SESSION;
}
export interface NoOpAction {
    type: typeof RootActionType.NO_OP;
}

export type RootAction =
    | RegisterUserAction
    | RegisterUserSuccessAction
    | RegisterUserFailureAction
    | VerifyUserAction
    | VerifyUserSuccessAction
    | VerifyUserFailureAction
    | LoginUserAction
    | LoginUserSuccessAction
    | LoginUserFailureAction
    | ValidateSessionAction
    | ValidateSessionSuccessAction
    | ValidateSessionFailureAction
    | RecoverPasswordAction
    | RecoverPasswordSuccessAction
    | RecoverPasswordFailureAction
    | SetNewPasswordAction
    | SetNewPasswordSuccessAction
    | SetNewPasswordFailureAction
    | LogoutUserAction
    | LogoutUserFailureAction
    | RemoveSessionAction
    | NoOpAction;

export function registerUser(name: string, email: string, password: string): RegisterUserAction {
    return {
        type: RootActionType.REGISTER_USER,
        name,
        email,
        password,
    };
}

export function registerUserSuccess(result: boolean): RegisterUserSuccessAction {
    return {
        type: RootActionType.REGISTER_USER_SUCCESS,
        result,
    };
}

export function registerUserFailure(error: DefaultError): RegisterUserFailureAction {
    return {
        type: RootActionType.REGISTER_USER_FAILURE,
        error,
    };
}

export function verifyUser(email: string, token: string): VerifyUserAction {
    return {
        type: RootActionType.VERIFY_USER,
        email,
        token,
    };
}

export function verifyUserSuccess(result: boolean): VerifyUserSuccessAction {
    return {
        type: RootActionType.VERIFY_USER_SUCCESS,
        result,
    };
}

export function verifyUserFailure(error: DefaultError): VerifyUserFailureAction {
    return {
        type: RootActionType.VERIFY_USER_FAILURE,
        error,
    };
}

export function loginUser(email: string, password: string): LoginUserAction {
    return {
        type: RootActionType.LOGIN_USER,
        email,
        password,
    };
}

export function loginUserSuccess(token: string): LoginUserSuccessAction {
    return {
        type: RootActionType.LOGIN_USER_SUCCESS,
        token,
    };
}

export function loginUserFailure(error: DefaultError): LoginUserFailureAction {
    return {
        type: RootActionType.LOGIN_USER_FAILURE,
        error,
    };
}

export function validateSession(): ValidateSessionAction {
    return {
        type: RootActionType.VALIDATE_SESSION,
    };
}

export function validateSessionSuccess(result: string | null): ValidateSessionSuccessAction {
    return {
        type: RootActionType.VALIDATE_SESSION_SUCCESS,
        result,
    };
}

export function validateSessionFailure(error: DefaultError): ValidateSessionFailureAction {
    return {
        type: RootActionType.VALIDATE_SESSION_FAILURE,
        error,
    };
}

export function recoverPassword(email: string): RecoverPasswordAction {
    return {
        type: RootActionType.RECOVER_PASSWORD,
        email,
    };
}

export function recoverPasswordSuccess(result: boolean): RecoverPasswordSuccessAction {
    return {
        type: RootActionType.RECOVER_PASSWORD_SUCCESS,
        result,
    };
}

export function recoverPasswordFailure(error: DefaultError): RecoverPasswordFailureAction {
    return {
        type: RootActionType.RECOVER_PASSWORD_FAILURE,
        error,
    };
}

export function setNewPassword(
    email: string,
    token: string,
    password: string
): SetNewPasswordAction {
    return {
        type: RootActionType.SET_NEW_PASSWORD,
        email,
        token,
        password,
    };
}

export function setNewPasswordSuccess(result: boolean): SetNewPasswordSuccessAction {
    return {
        type: RootActionType.SET_NEW_PASSWORD_SUCCESS,
        result,
    };
}

export function setNewPasswordFailure(error: DefaultError): SetNewPasswordFailureAction {
    return {
        type: RootActionType.SET_NEW_PASSWORD_FAILURE,
        error,
    };
}

export function logoutUser(session: string): LogoutUserAction {
    return {
        type: RootActionType.LOGOUT_USER,
        session,
    };
}

export function logoutUserFailure(error: DefaultError): LogoutUserFailureAction {
    return {
        type: RootActionType.LOGOUT_FAILURE,
        error,
    };
}

export function removeSession(): RemoveSessionAction {
    return {
        type: RootActionType.REMOVE_SESSION,
    };
}

export function noOp(): NoOpAction {
    return {
        type: RootActionType.NO_OP,
    };
}

export function rootReducer(state: RootState = initialRootState, action: RootAction): RootState {
    switch (action.type) {
        case RootActionType.REGISTER_USER: {
            return { ...state, userRegistration: { status: "in-progress" } };
        }
        case RootActionType.REGISTER_USER_SUCCESS: {
            return { ...state, userRegistration: { status: "successful", data: action.result } };
        }
        case RootActionType.REGISTER_USER_FAILURE: {
            return { ...state, userRegistration: { status: "failed", error: action.error } };
        }
        case RootActionType.VERIFY_USER: {
            return { ...state, userVerification: { status: "in-progress" } };
        }
        case RootActionType.VERIFY_USER_SUCCESS: {
            return { ...state, userVerification: { status: "successful", data: action.result } };
        }
        case RootActionType.VERIFY_USER_FAILURE: {
            return { ...state, userVerification: { status: "failed", error: action.error } };
        }
        case RootActionType.LOGIN_USER: {
            return { ...state, userLogin: { status: "in-progress" } };
        }
        case RootActionType.LOGIN_USER_SUCCESS: {
            return {
                ...state,
                userLogin: { status: "successful", data: true },
                session: action.token,
            };
        }
        case RootActionType.LOGIN_USER_FAILURE: {
            return { ...state, userLogin: { status: "failed", error: action.error } };
        }
        case RootActionType.VALIDATE_SESSION: {
            return { ...state, sessionValidation: { status: "in-progress" } };
        }
        case RootActionType.VALIDATE_SESSION_SUCCESS: {
            return {
                ...state,
                sessionValidation: { status: "successful", data: true },
                session: action.result,
            };
        }
        case RootActionType.VALIDATE_SESSION_FAILURE: {
            return {
                ...initialRootState,
                sessionValidation: { status: "failed", error: action.error },
            };
        }
        case RootActionType.RECOVER_PASSWORD: {
            return { ...state, passwordRecovery: { status: "in-progress" } };
        }
        case RootActionType.RECOVER_PASSWORD_SUCCESS: {
            return { ...state, passwordRecovery: { status: "successful", data: action.result } };
        }
        case RootActionType.RECOVER_PASSWORD_FAILURE: {
            return { ...state, passwordRecovery: { status: "failed", error: action.error } };
        }
        case RootActionType.SET_NEW_PASSWORD: {
            return { ...state, setNewPassword: { status: "in-progress" } };
        }
        case RootActionType.SET_NEW_PASSWORD_SUCCESS: {
            return { ...state, setNewPassword: { status: "successful", data: action.result } };
        }
        case RootActionType.SET_NEW_PASSWORD_FAILURE: {
            return { ...state, setNewPassword: { status: "failed", error: action.error } };
        }
        case RootActionType.LOGOUT_USER: {
            return { ...state, userLogout: { status: "in-progress" } };
        }
        case RootActionType.LOGOUT_FAILURE: {
            return { ...state, userLogout: { status: "failed", error: action.error } };
        }
        case RootActionType.REMOVE_SESSION: {
            return { ...state, userLogout: { status: "pending" } };
        }
        default:
            return state;
    }
}
