// import { User } from "Domain/user";
import { AsyncOp } from "Helpers/asyncOp";
import { DefaultError } from "Domain/error";

export interface RootState {
    userRegistration: AsyncOp<boolean, DefaultError>;
}

const initialRootState: RootState = {
    userRegistration: { status: "pending" },
};

export enum RootActionType {
    REGISTER_USER = "[ROOT] - REGISTER USER",
    REGISTER_USER_SUCCESS = "[ROOT] - REGISTER USER SUCCESS",
    REGISTER_USER_FAILURE = "[ROOT] - REGISTER USER FAILURE",
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

export type RootAction = RegisterUserAction | RegisterUserSuccessAction | RegisterUserFailureAction;

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
        default:
            return state;
    }
}
