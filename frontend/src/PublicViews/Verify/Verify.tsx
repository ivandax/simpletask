import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useVerifyStyles } from "./styles";
import querystring from "querystring";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as t from "io-ts";
import { pipe } from "fp-ts/function";

//components
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";

// redux actions
import { verifyUser } from "PublicViews/Root/RootReducer";

// state
import { State } from "Store/state";

const UrlParamsDecoder = t.exact(
    t.type({
        email: t.string,
        ref: t.string,
    })
);

interface VerifyProps {
    userIsAuthenticated: boolean;
}

const Verify = ({ userIsAuthenticated }: VerifyProps): JSX.Element => {
    const classes = useVerifyStyles();
    const location = useLocation();
    const dispatch = useDispatch();

    const verificationState = useSelector((state: State) => state.root.userVerification);

    const [decodingError, setDecodingError] = useState<O.Option<string>>(O.none);

    useEffect((): void => {
        const query = querystring.parse(location.search.substring(1, location.search.length));
        pipe(
            query,
            UrlParamsDecoder.decode,
            E.fold(
                () => setDecodingError(O.some("Oops... something went wrong")),
                ({ email, ref }) => dispatch(verifyUser(email, ref))
            )
        );
    }, []);

    if (userIsAuthenticated) {
        return <Redirect to="/app" />;
    }

    switch (verificationState.status) {
        case "pending":
        case "in-progress":
        case "re-executing":
            return (
                <div className={classes.container}>
                    <div className={classes.verify}>
                        {pipe(
                            decodingError,
                            O.fold(
                                () => <LoadingOverlay />,
                                (error) => (
                                    <AlertDisplay
                                        severity="error"
                                        title="Verification Error"
                                        message={error}
                                    />
                                )
                            )
                        )}
                    </div>
                </div>
            );
        case "failed":
            return (
                <div className={classes.container}>
                    <AlertDisplay
                        severity="error"
                        title="Verification Problem"
                        message={verificationState.error.error}
                    />
                </div>
            );
        case "successful":
            return (
                <div className={classes.container}>
                    <div className={classes.successMessage}>
                        <AlertDisplay
                            severity="success"
                            title="Your account has been verified"
                            message="You can now access all the features of the platform"
                        />
                        <Button href="/login" variant="outlined" className={classes.redirectButton}>
                            Go to Login
                        </Button>
                    </div>
                </div>
            );
    }
};

export default Verify;
