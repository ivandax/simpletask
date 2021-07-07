import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { useLoginStyles } from "./styles";

//components
import StringInput from "Components/StringInput";

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Login = (): JSX.Element => {
    const initialValues = {
        email: "",
        password: "",
    };
    const classes = useLoginStyles();
    console.log(`renders for Login`);

    const Main = (): JSX.Element => {
        return (
            <div className={classes.login}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values): void => console.log(values)}
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
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    };

    return (
        <div className={classes.container}>
            <Main />
        </div>
    );
};

export default Login;
