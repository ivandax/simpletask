import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { useRecoverPasswordStyles } from "./styles";
import Brand from "Components/Brand";

//components
import StringInput from "Components/StringInput";
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";

// redux actions
import { recoverPassword } from "PublicViews/Root/RootReducer";

// state
import { State } from "Store/state";

// helpers
import { mapError } from "Helpers/errors";

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
});

interface RecoverPasswordProps {
    userIsAuthenticated: boolean;
}

const RecoverPassword = ({ userIsAuthenticated }: RecoverPasswordProps): JSX.Element => {
    const initialValues = {
        email: "",
    };
    const classes = useRecoverPasswordStyles();

    const dispatch = useDispatch();
    const passwordRecoveryState = useSelector((state: State) => state.root.passwordRecovery);

    if (userIsAuthenticated) {
        return <Redirect to="/app" />;
    }

    switch (passwordRecoveryState.status) {
        case "pending":
        case "in-progress":
        case "re-executing":
            return (
                <div className={classes.container}>
                    <div className={classes.recoverPassword}>
                        {passwordRecoveryState.status === "in-progress" ||
                        passwordRecoveryState.status === "re-executing" ? (
                            <LoadingOverlay />
                        ) : null}
                        <Brand text="Recover your password" />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={({ email }): void => {
                                dispatch(recoverPassword(email));
                            }}
                        >
                            {(formik): JSX.Element => (
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className={classes.recoverPasswordForm}
                                >
                                    <StringInput
                                        identifier="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        formikTouched={formik.touched.email}
                                        formikErrors={formik.errors.email}
                                    />
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        className={classes.submitButton}
                                    >
                                        Send Recovery Email
                                    </Button>
                                </form>
                            )}
                        </Formik>
                        <div className={classes.links}>
                            <Link to={"/login"} className={classes.link}>
                                Already have an account? Log in
                            </Link>
                        </div>
                    </div>
                </div>
            );
        case "failed":
            return (
                <div className={classes.container}>
                    <AlertDisplay
                        severity="error"
                        title="Password Recovery Problem"
                        message={mapError(passwordRecoveryState.error)}
                    />
                </div>
            );
        case "successful":
            return (
                <div className={classes.container}>
                    <div className={classes.successMessage}>
                        <AlertDisplay
                            severity="success"
                            title="Password Recovery Email Sent"
                            message="Please, check your email and click on the link to reset your password"
                        />
                        <Button href="/login" variant="outlined" className={classes.redirectButton}>
                            Go to Login
                        </Button>
                    </div>
                </div>
            );
    }
};

export default RecoverPassword;
