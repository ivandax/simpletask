import { User } from "Domain/user";

export interface RootState {
    user: User | null;
}

const initialRootState: RootState = {
    user: null,
};

export enum RootActionType {
    LOAD_USER = "[ROOT] - Load User",
}

export interface LoadUserAction {
    type: typeof RootActionType.LOAD_USER;
}

export type RootAction = LoadUserAction;

export function loadUser(): LoadUserAction {
    return {
        type: RootActionType.LOAD_USER,
    };
}

export function rootReducer(state: RootState = initialRootState, action: RootAction): RootState {
    switch (action.type) {
        case RootActionType.LOAD_USER: {
            return state;
        }
        default:
            return state;
    }
}
