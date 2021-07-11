import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useSetNewPasswordStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import querystring from "querystring";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as t from "io-ts";
import { pipe } from "fp-ts/function";

//components
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";
import StringInput from "Components/StringInput";

// redux actions
import { setNewPassword } from "PublicViews/Root/RootReducer";

// state
import { State } from "Store/state";

const UrlParamsDecoder = t.exact(
    t.type({
        email: t.string,
        ref: t.string,
    })
);

const validationSchema = yup.object({
    password: yup.string().min(8).required("Password is required"),
    repeatPassword: yup
        .string()
        .min(8)
        .required("Please, repeat the password")
        .oneOf([yup.ref("password"), null], "The passwords are not equal"),
});

interface SetNewPasswordProps {
    userIsAuthenticated: boolean;
}

const SetNewPassword = ({ userIsAuthenticated }: SetNewPasswordProps): JSX.Element => {
    const classes = useSetNewPasswordStyles();
    const location = useLocation();
    const dispatch = useDispatch();

    const [decodingError, setDecodingError] = useState<O.Option<string>>(O.none);
    const [decodedValues, setDecodedValues] = useState({ email: "", token: "" });

    useEffect((): void => {
        const query = querystring.parse(location.search.substring(1, location.search.length));
        pipe(
            query,
            UrlParamsDecoder.decode,
            E.fold(
                () => setDecodingError(O.some("Oops... something went wrong")),
                ({ email, ref }) => {
                    setDecodedValues({ email: email, token: ref });
                }
            )
        );
    }, []);

    const setNewPasswordState = useSelector((state: State) => state.root.setNewPassword);

    const initialValues = {
        password: "",
        repeatPassword: "",
    };

    if (userIsAuthenticated) {
        return <Redirect to="/app" />;
    }

    switch (setNewPasswordState.status) {
        case "pending":
            return (
                <div className={classes.container}>
                    <div className={classes.verify}>
                        {pipe(
                            decodingError,
                            O.fold(
                                () => (
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={({ password }): void => {
                                            dispatch(
                                                setNewPassword(
                                                    decodedValues.email,
                                                    decodedValues.token,
                                                    password
                                                )
                                            );
                                        }}
                                    >
                                        {(formik): JSX.Element => (
                                            <form
                                                onSubmit={formik.handleSubmit}
                                                className={classes.setNewPasswordForm}
                                            >
                                                <StringInput
                                                    identifier="password"
                                                    label="New Password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    formikTouched={formik.touched.password}
                                                    formikErrors={formik.errors.password}
                                                    type="password"
                                                />
                                                <StringInput
                                                    identifier="repeatPassword"
                                                    label="Repeat New Password"
                                                    value={formik.values.repeatPassword}
                                                    onChange={formik.handleChange}
                                                    formikTouched={formik.touched.repeatPassword}
                                                    formikErrors={formik.errors.repeatPassword}
                                                    type="password"
                                                />
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    fullWidth
                                                    type="submit"
                                                    className={classes.submitButton}
                                                >
                                                    Set Password
                                                </Button>
                                            </form>
                                        )}
                                    </Formik>
                                ),
                                (error) => (
                                    <AlertDisplay
                                        severity="error"
                                        title="Setting Password Error"
                                        message={error}
                                    />
                                )
                            )
                        )}
                    </div>
                </div>
            );
        case "in-progress":
        case "re-executing":
            return (
                <div className={classes.container}>
                    <div className={classes.verify}>
                        <LoadingOverlay />
                    </div>
                </div>
            );
        case "failed":
            return (
                <div className={classes.container}>
                    <AlertDisplay
                        severity="error"
                        title="Verification Problem"
                        message={setNewPasswordState.error.error}
                    />
                </div>
            );
        case "successful":
            return (
                <div className={classes.container}>
                    <div className={classes.successMessage}>
                        <AlertDisplay
                            severity="success"
                            title="New Password"
                            message="You have successfully reset your password"
                        />
                        <Button href="/login" variant="outlined" className={classes.redirectButton}>
                            Go to Login
                        </Button>
                    </div>
                </div>
            );
    }
};

export default SetNewPassword;
