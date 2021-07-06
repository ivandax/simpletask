import * as axiosTypes from "axios";
import Axios from "axios-observable";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

// domain
import { DefaultError } from "Domain/error";
// import { User } from "Domain/user";

//persistence
import { config } from "Persistence/config";

//helpers
import { Dictionary } from "Helpers/types";

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
    return Axios.post(config.users.register, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    }).pipe(
        catchError((error) => {
            throw parseResponseError(error);
        }),
        map(extractResponseBody),
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

const errorMessageCodec = t.exact(
    t.type({
        _error: t.exact(
            t.type({
                message: t.string,
            })
        ),
    })
);

function extractResponseBody(
    response: axiosTypes.AxiosResponse<Dictionary<string, unknown>>
): Dictionary<string, unknown> {
    return response.data;
}

function parseResponseError(axiosError: axiosTypes.AxiosError): DefaultError {
    if (axiosError.response === undefined) {
        return { error: "Network Error" };
    } else {
        const defaultMsg = "Undetermined Error";
        const errorMsg = pipe(
            axiosError.response.data,
            errorMessageCodec.decode,
            E.map((decodedData) => decodedData._error.message),
            E.getOrElse(() => defaultMsg)
        );
        return { error: errorMsg };
    }
}
