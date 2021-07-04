import { User } from "Domain/user";
import { AsyncOp } from "Helpers/asyncOp";
import { DefaultError } from "Domain/error";

export interface RootState {
    userRegistration: AsyncOp<User, DefaultError>;
}

const initialRootState: RootState = {
    userRegistration: { status: "pending" },
};

export enum RootActionType {
    REGISTER_USER = "[ROOT] - REGISTER USER",
}

export interface RegisterUserAction {
    type: typeof RootActionType.REGISTER_USER;
    name: string;
    email: string;
    password: string;
}

export type RootAction = RegisterUserAction;

export function registerUser(name: string, email: string, password: string): RegisterUserAction {
    return {
        type: RootActionType.REGISTER_USER,
        name,
        email,
        password,
    };
}

export function rootReducer(state: RootState = initialRootState, action: RootAction): RootState {
    switch (action.type) {
        case RootActionType.REGISTER_USER: {
            return { ...state, userRegistration: { status: "in-progress" } };
        }
        default:
            return state;
    }
}
