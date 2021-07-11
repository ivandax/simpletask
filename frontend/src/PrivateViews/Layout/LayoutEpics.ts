import { Epic } from "redux-observable";
import { of } from "rxjs";
import { mergeMap, map, filter, catchError } from "rxjs/operators";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";

//reducer
import * as reducer from "./LayoutReducer";

//persistence
import * as userPersistence from "Persistence/user";

//domain
import { DefaultError } from "Domain/error";
import { User } from "Domain/user";

const getUserInfoEpic: Epic<
    reducer.LayoutAction,
    reducer.GetUserInfoSuccessAction | reducer.GetUserInfoFailureAction
> = (action$) =>
    action$.pipe(
        filter(
            (action): action is reducer.GetUserInfoAction =>
                action.type === reducer.LayoutActionType.GET_USER_INFO
        ),
        mergeMap((action) => {
            return userPersistence.getUserInfo(action.session).pipe(
                map((eitherUser) =>
                    pipe(
                        eitherUser,
                        E.fold<
                            DefaultError,
                            User,
                            reducer.GetUserInfoSuccessAction | reducer.GetUserInfoFailureAction
                        >(
                            (error) => reducer.getUserInfoFailure(error),
                            (user) => reducer.getUserInfoSuccess(user)
                        )
                    )
                ),
                catchError((error) => of(reducer.getUserInfoFailure(error)))
            );
        })
    );

export default [getUserInfoEpic];
