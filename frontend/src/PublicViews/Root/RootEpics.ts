import { Epic } from "redux-observable";
import { of } from "rxjs";
import { mergeMap, map, filter, catchError } from "rxjs/operators";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";

//reducer
import * as reducer from "./RootReducer";

//persistence
import * as userPersistence from "Persistence/user";

//domain
import { DefaultError } from "Domain/error";
import { User } from "Domain/user";

const registerUserEpic: Epic<
    reducer.RootAction,
    reducer.RegisterUserSuccessAction | reducer.RegisterUserFailureAction
> = (action$) =>
    action$.pipe(
        filter(
            (action): action is reducer.RegisterUserAction =>
                action.type === reducer.RootActionType.REGISTER_USER
        ),
        mergeMap((action) => {
            return userPersistence
                .registerUser({
                    name: action.name,
                    email: action.email,
                    password: action.password,
                })
                .pipe(
                    map((eitherRegisterUser) =>
                        pipe(
                            eitherRegisterUser,
                            E.fold<
                                DefaultError,
                                boolean,
                                | reducer.RegisterUserSuccessAction
                                | reducer.RegisterUserFailureAction
                            >(
                                (error) => reducer.registerUserFailure(error),
                                (result) => reducer.registerUserSuccess(result)
                            )
                        )
                    ),
                    catchError((error) => of(reducer.registerUserFailure(error)))
                );
        })
    );

const verifyUserEpic: Epic<
    reducer.RootAction,
    reducer.VerifyUserSuccessAction | reducer.VerifyUserFailureAction
> = (action$) =>
    action$.pipe(
        filter(
            (action): action is reducer.VerifyUserAction =>
                action.type === reducer.RootActionType.VERIFY_USER
        ),
        mergeMap((action) => {
            return userPersistence
                .verifyUser({
                    email: action.email,
                    token: action.token,
                })
                .pipe(
                    map((eitherVerifyUser) =>
                        pipe(
                            eitherVerifyUser,
                            E.fold<
                                DefaultError,
                                boolean,
                                reducer.VerifyUserSuccessAction | reducer.VerifyUserFailureAction
                            >(
                                (error) => reducer.verifyUserFailure(error),
                                (result) => reducer.verifyUserSuccess(result)
                            )
                        )
                    ),
                    catchError((error) => of(reducer.verifyUserFailure(error)))
                );
        })
    );

const loginUserEpic: Epic<
    reducer.RootAction,
    reducer.LoginUserSuccessAction | reducer.LoginUserFailureAction
> = (action$) =>
    action$.pipe(
        filter(
            (action): action is reducer.LoginUserAction =>
                action.type === reducer.RootActionType.LOGIN_USER
        ),
        mergeMap((action) => {
            return userPersistence
                .loginUser({
                    email: action.email,
                    password: action.password,
                })
                .pipe(
                    map((eitherLoginUser) =>
                        pipe(
                            eitherLoginUser,
                            E.fold<
                                DefaultError,
                                { user: User; token: string },
                                reducer.LoginUserSuccessAction | reducer.LoginUserFailureAction
                            >(
                                (error) => reducer.loginUserFailure(error),
                                (result) => reducer.loginUserSuccess(result)
                            )
                        )
                    ),
                    catchError((error) => of(reducer.loginUserFailure(error)))
                );
        })
    );

export default [registerUserEpic, verifyUserEpic, loginUserEpic];
