import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { useSignUpStyles } from "./styles";
import Brand from "Components/Brand";

//components
import StringInput from "Components/StringInput";
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";

// redux actions
import { registerUser } from "PublicViews/Root/RootReducer";

// state
import { State } from "Store/state";

// helpers
import { mapError } from "Helpers/errors";

const validationSchema = yup.object({
    name: yup.string(),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    repeatPassword: yup
        .string()
        .min(8)
        .required("Please, repeat the password")
        .oneOf([yup.ref("password"), null], "The passwords are not equal"),
});

interface SignUpProps {
    userIsAuthenticated: boolean;
}

const SignUp = ({ userIsAuthenticated }: SignUpProps): JSX.Element => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    };
    const classes = useSignUpStyles();

    const dispatch = useDispatch();
    const registrationState = useSelector((state: State) => state.root.userRegistration);

    if (userIsAuthenticated) {
        return <Redirect to="/app" />;
    }

    switch (registrationState.status) {
        case "pending":
        case "in-progress":
        case "re-executing":
            return (
                <div className={classes.container}>
                    <div className={classes.signUp}>
                        {registrationState.status === "in-progress" ||
                        registrationState.status === "re-executing" ? (
                            <LoadingOverlay />
                        ) : null}
                        <Brand text="Create Account" />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={({ name, email, password }): void => {
                                dispatch(registerUser(name, email, password));
                            }}
                        >
                            {(formik): JSX.Element => (
                                <form onSubmit={formik.handleSubmit} className={classes.signUpForm}>
                                    <StringInput
                                        identifier="name"
                                        label="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        formikTouched={formik.touched.name}
                                        formikErrors={formik.errors.name}
                                    />
                                    <StringInput
                                        identifier="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        formikTouched={formik.touched.email}
                                        formikErrors={formik.errors.email}
                                    />
                                    <StringInput
                                        identifier="password"
                                        label="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        formikTouched={formik.touched.password}
                                        formikErrors={formik.errors.password}
                                        type="password"
                                    />
                                    <StringInput
                                        identifier="repeatPassword"
                                        label="Repeat Password"
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
                                        Create Account
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
                        title="Registration Problem"
                        message={mapError(registrationState.error)}
                    />
                </div>
            );
        case "successful":
            return (
                <div className={classes.container}>
                    <div className={classes.successMessage}>
                        <AlertDisplay
                            severity="success"
                            title="Email Verification Sent"
                            message="Please, check your email and click on the link to verify your account"
                        />
                        <Button href="/login" variant="outlined" className={classes.redirectButton}>
                            Go to Login
                        </Button>
                    </div>
                </div>
            );
    }
};

export default SignUp;
