import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { useSignUpStyles } from "./styles";

//components
import StringInput from "Components/StringInput";
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";

// redux actions
import { registerUser } from "PublicViews/Root/RootReducer";

// state
import { State } from "Store/state";

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

const SignUp = (): JSX.Element => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    };
    const classes = useSignUpStyles();

    const dispatch = useDispatch();
    const rootState = useSelector((state: State) => state.root);

    const Main = (): JSX.Element => {
        switch (rootState.userRegistration.status) {
            case "pending":
            case "in-progress":
            case "re-executing":
                return (
                    <div className={classes.signUp}>
                        {rootState.userRegistration.status === "in-progress" ||
                        rootState.userRegistration.status === "re-executing" ? (
                            <LoadingOverlay />
                        ) : null}
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
                                        Crear
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </div>
                );
            case "failed":
                return (
                    <div>
                        <AlertDisplay
                            severity="error"
                            title="Registration Problem"
                            message={rootState.userRegistration.error.error}
                        />
                    </div>
                );
            case "successful":
                return <div>Verification Message sent!</div>;
        }
    };

    return (
        <div className={classes.container}>
            <Main />
        </div>
    );
};

export default SignUp;
