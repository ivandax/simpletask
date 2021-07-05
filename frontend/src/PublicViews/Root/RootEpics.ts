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
                                User,
                                | reducer.RegisterUserSuccessAction
                                | reducer.RegisterUserFailureAction
                            >(
                                (error) => reducer.registerUserFailure(error),
                                (user) => reducer.registerUserSuccess(user)
                            )
                        )
                    ),
                    catchError((error) => of(reducer.registerUserFailure(error)))
                );
        })
    );

export default [registerUserEpic];
