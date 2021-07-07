// import { User } from "Domain/user";
import { AsyncOp } from "Helpers/asyncOp";
import { DefaultError } from "Domain/error";

export interface RootState {
    userRegistration: AsyncOp<boolean, DefaultError>;
    userVerification: AsyncOp<boolean, DefaultError>;
}

const initialRootState: RootState = {
    userRegistration: { status: "pending" },
    userVerification: { status: "pending" },
};

export enum RootActionType {
    REGISTER_USER = "[ROOT] - REGISTER USER",
    REGISTER_USER_SUCCESS = "[ROOT] - REGISTER USER SUCCESS",
    REGISTER_USER_FAILURE = "[ROOT] - REGISTER USER FAILURE",

    VERIFY_USER = "[ROOT] - VERIFY USER",
    VERIFY_USER_SUCCESS = "[ROOT] - VERIFY USER SUCCESS",
    VERIFY_USER_FAILURE = "[ROOT] - VERIFY USER FAILURE",
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

export type RootAction =
    | RegisterUserAction
    | RegisterUserSuccessAction
    | RegisterUserFailureAction
    | VerifyUserAction
    | VerifyUserSuccessAction
    | VerifyUserFailureAction;

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
        default:
            return state;
    }
}
