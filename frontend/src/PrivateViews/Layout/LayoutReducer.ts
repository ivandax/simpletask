import { AsyncOp } from "Helpers/asyncOp";
import { DefaultError } from "Domain/error";

//domain
import { User } from "Domain/user";

export interface LayoutState {
    userInfo: AsyncOp<User, DefaultError>;
}

const initialLayoutState: LayoutState = {
    userInfo: { status: "pending" },
};

export enum LayoutActionType {
    GET_USER_INFO = "[LAYOUT] - GET USER INFO",
    GET_USER_INFO_SUCCESS = "[LAYOUT] - GET USER INFO SUCCESS",
    GET_USER_INFO_FAILURE = "[LAYOUT] - GET USER INFO FAILURE",

    RESET_LAYOUT_STATE = "[LAYOUT] - RESET LAYOUT STATE",
}

export interface GetUserInfoAction {
    type: typeof LayoutActionType.GET_USER_INFO;
    session: string;
}
export interface GetUserInfoSuccessAction {
    type: typeof LayoutActionType.GET_USER_INFO_SUCCESS;
    user: User;
}
export interface GetUserInfoFailureAction {
    type: typeof LayoutActionType.GET_USER_INFO_FAILURE;
    error: DefaultError;
}

export interface ResetLayoutStateAction {
    type: typeof LayoutActionType.RESET_LAYOUT_STATE;
}

export type LayoutAction =
    | GetUserInfoAction
    | GetUserInfoSuccessAction
    | GetUserInfoFailureAction
    | ResetLayoutStateAction;

export function getUserInfo(session: string): GetUserInfoAction {
    return {
        type: LayoutActionType.GET_USER_INFO,
        session,
    };
}

export function getUserInfoSuccess(user: User): GetUserInfoSuccessAction {
    return {
        type: LayoutActionType.GET_USER_INFO_SUCCESS,
        user,
    };
}

export function getUserInfoFailure(error: DefaultError): GetUserInfoFailureAction {
    return {
        type: LayoutActionType.GET_USER_INFO_FAILURE,
        error,
    };
}

export function resetLayoutState(): ResetLayoutStateAction {
    return {
        type: LayoutActionType.RESET_LAYOUT_STATE,
    };
}

export function layoutReducer(
    state: LayoutState = initialLayoutState,
    action: LayoutAction
): LayoutState {
    switch (action.type) {
        case LayoutActionType.GET_USER_INFO: {
            return { ...state, userInfo: { status: "in-progress" } };
        }
        case LayoutActionType.GET_USER_INFO_SUCCESS: {
            return { ...state, userInfo: { status: "successful", data: action.user } };
        }
        case LayoutActionType.GET_USER_INFO_FAILURE: {
            return { ...state, userInfo: { status: "failed", error: action.error } };
        }
        case LayoutActionType.RESET_LAYOUT_STATE: {
            return initialLayoutState;
        }
        default:
            return state;
    }
}
