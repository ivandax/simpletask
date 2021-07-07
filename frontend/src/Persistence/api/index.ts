import * as axiosTypes from "axios";
import Axios from "axios-observable";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

//helpers
import { Dictionary } from "Helpers/types";

// domain
import { DefaultError } from "Domain/error";

export function post<T>(endpoint: string, payload: T): Observable<Dictionary<string, unknown>> {
    return Axios.post(endpoint, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    }).pipe(
        catchError((error) => {
            throw parseResponseError(error);
        }),
        map(extractResponseBody)
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
