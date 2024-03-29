import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as t from "io-ts";
import * as Cookies from "es-cookie";
import { pipe } from "fp-ts/function";

// domain
import { DefaultError } from "Domain/error";
import { User } from "Domain/user";

//persistence
import { config } from "Persistence/config";
import * as api from "./api";

const LoginResponseCodec = t.exact(
    t.type({
        token: t.string,
    })
);

interface RegistrationPayload {
    name: string;
    email: string;
    password: string;
}

const SuccessResponseDecoder = t.exact(
    t.type({
        success: t.boolean,
    })
);

export function registerUser(
    payload: RegistrationPayload
): Observable<E.Either<DefaultError, boolean>> {
    return api.post(config.users.register, payload).pipe(
        map(SuccessResponseDecoder.decode),
        map(E.map((decoded) => decoded.success)),
        map(
            E.mapLeft((errors) => {
                console.log(errors);
                return { error: "Registration - success Response Decoding Error" };
            })
        )
    );
}

interface VerificationPayload {
    email: string;
    token: string;
}

export function verifyUser(
    payload: VerificationPayload
): Observable<E.Either<DefaultError, boolean>> {
    return api.post(config.users.verify, payload).pipe(
        map(SuccessResponseDecoder.decode),
        map(E.map((decoded) => decoded.success)),
        map(
            E.mapLeft((errors) => {
                console.log(errors);
                return { error: "Verification - success Response Decoding Error" };
            })
        )
    );
}
interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export function loginUser(
    payload: LoginPayload
): Observable<E.Either<DefaultError, LoginResponse>> {
    return api.post(config.users.login, payload).pipe(
        map(LoginResponseCodec.decode),
        map((eitherDecoded) => {
            pipe(
                eitherDecoded,
                E.fold(
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    () => {},
                    (decoded) => Cookies.set(config.variables.cookieName, decoded.token)
                )
            );
            return eitherDecoded;
        }),
        map(
            E.mapLeft((errors) => {
                console.log(errors);
                return { error: "Login - success Response Decoding Error" };
            })
        )
    );
}

export function validateSession(): Observable<E.Either<DefaultError, string | null>> {
    const cookie = Cookies.get(config.variables.cookieName);
    return pipe(
        O.fromNullable(cookie),
        O.fold(
            () => {
                return of(E.left({ error: "cookie not found" }));
            },
            (maybeValidToken) =>
                api.get(config.users.validateSession, maybeValidToken).pipe(
                    map(SuccessResponseDecoder.decode),
                    map(E.map((decoded) => (decoded.success === true ? maybeValidToken : null))),
                    map(
                        E.mapLeft((errors) => {
                            console.log(errors);
                            return { error: "Valid session - success Response Decoding Error" };
                        })
                    )
                )
        )
    );
}

interface PasswordRecoveryPayload {
    email: string;
}

export function recoverPassword(
    payload: PasswordRecoveryPayload
): Observable<E.Either<DefaultError, boolean>> {
    return api.post(config.users.passwordRecovery, payload).pipe(
        map(SuccessResponseDecoder.decode),
        map(E.map((decoded) => decoded.success)),
        map(
            E.mapLeft((errors) => {
                console.log(errors);
                return { error: "Password recovery - success Response Decoding Error" };
            })
        )
    );
}

interface SetNewPasswordPayload {
    email: string;
    token: string;
    password: string;
}

export function setNewPassword(
    payload: SetNewPasswordPayload
): Observable<E.Either<DefaultError, boolean>> {
    return api.post(config.users.setNewPassword, payload).pipe(
        map(SuccessResponseDecoder.decode),
        map(E.map((decoded) => decoded.success)),
        map(
            E.mapLeft((errors) => {
                console.log(errors);
                return { error: "Set new password - success Response Decoding Error" };
            })
        )
    );
}

const UserDecoder = t.type({
    verified: t.boolean,
    _id: t.string,
    name: t.string,
    createdAt: t.string,
    updatedAt: t.string,
    email: t.string,
});

export function getUserInfo(session: string): Observable<E.Either<DefaultError, User>> {
    return api.get(config.users.userInfo, session).pipe(
        map(UserDecoder.decode),
        map(
            E.mapLeft((errors) => {
                console.log("user decoding errors");
                console.log(errors);
                return { error: "Get User Info decoding failure" };
            })
        )
    );
}

export function logout(session: string): Observable<E.Either<DefaultError, boolean>> {
    return api.get(config.users.logout, session).pipe(
        map(SuccessResponseDecoder.decode),
        map(E.map((decoded) => decoded.success)),
        map(
            E.mapLeft((errors) => {
                console.log("logout decoding errors");
                console.log(errors);
                return { error: "Logout decoding failure" };
            })
        )
    );
}

export function removeSession(): void {
    Cookies.remove(config.variables.cookieName);
}
