import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { useLoginStyles } from "./styles";

//components
import StringInput from "Components/StringInput";
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";

// state
import { State } from "Store/state";

// redux actions
import { loginUser } from "PublicViews/Root/RootReducer";

const validationSchema = yup.object({
    email: yup.string().min(8).email("Enter a valid email").required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
});

const Login = (): JSX.Element => {
    const initialValues = {
        email: "",
        password: "",
    };
    const classes = useLoginStyles();

    const dispatch = useDispatch();
    const loginState = useSelector((state: State) => state.root.userLogin);

    const Main = (): JSX.Element => {
        switch (loginState.status) {
            case "pending":
            case "in-progress":
            case "re-executing":
            case "failed":
                return (
                    <div className={classes.login}>
                        {loginState.status === "in-progress" ||
                        loginState.status === "re-executing" ? (
                            <LoadingOverlay />
                        ) : null}
                        {loginState.status === "failed" ? (
                            <AlertDisplay
                                severity="error"
                                title="Could not login"
                                message="Please, check your email or password"
                            />
                        ) : null}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={({ email, password }): void => {
                                dispatch(loginUser(email, password));
                            }}
                        >
                            {(formik): JSX.Element => (
                                <form onSubmit={formik.handleSubmit} className={classes.loginForm}>
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
            case "successful":
                return <Redirect to="/app" />;
        }
    };

    return (
        <div className={classes.container}>
            <Main />
        </div>
    );
};

export default Login;
