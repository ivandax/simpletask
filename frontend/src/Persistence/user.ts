import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as E from "fp-ts/Either";
import * as t from "io-ts";

// domain
import { DefaultError } from "Domain/error";
// import { User } from "Domain/user";

//persistence
import { config } from "Persistence/config";
import * as api from "./api";

// const UserCodec = t.exact(
//     t.type(
//         {
//             verified: t.boolean,
//             _id: t.string,
//             name: t.string,
//             email: t.string,
//             createdAt: t.string,
//             updatedAt: t.string,
//         },
//         "UserCodec"
//     )
// );

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
                return { error: "Success Response Decoding Error" };
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
                return { error: "Success Response Decoding Error" };
            })
        )
    );
}
