import { User } from "Domain/user";
import { AsyncOp } from "Helpers/asyncOp";
import { DefaultError } from "Domain/error";

export interface RootState {
    userRegistration: AsyncOp<boolean, DefaultError>;
    userVerification: AsyncOp<boolean, DefaultError>;
    userLogin: AsyncOp<{ user: User; token: string }, DefaultError>;
    sessionValidation: AsyncOp<boolean, DefaultError>;
}

const initialRootState: RootState = {
    userRegistration: { status: "pending" },
    userVerification: { status: "pending" },
    userLogin: { status: "pending" },
    sessionValidation: { status: "pending" },
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
    result: { user: User; token: string };
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
    result: boolean;
}
export interface ValidateSessionFailureAction {
    type: typeof RootActionType.VALIDATE_SESSION_FAILURE;
    error: DefaultError;
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
    | ValidateSessionFailureAction;

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

export function loginUserSuccess(result: { user: User; token: string }): LoginUserSuccessAction {
    return {
        type: RootActionType.LOGIN_USER_SUCCESS,
        result,
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

export function validateSessionSuccess(result: boolean): ValidateSessionSuccessAction {
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
            return { ...state, userLogin: { status: "successful", data: action.result } };
        }
        case RootActionType.LOGIN_USER_FAILURE: {
            return { ...state, userLogin: { status: "failed", error: action.error } };
        }
        case RootActionType.VALIDATE_SESSION: {
            return { ...state, sessionValidation: { status: "in-progress" } };
        }
        case RootActionType.VALIDATE_SESSION_SUCCESS: {
            return { ...state, sessionValidation: { status: "successful", data: action.result } };
        }
        case RootActionType.VALIDATE_SESSION_FAILURE: {
            return { ...state, sessionValidation: { status: "failed", error: action.error } };
        }
        default:
            return state;
    }
}
