import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { useSignUpStyles } from "./styles";

//components
import StringInput from "Components/StringInput";

const validationSchema = yup.object({
    name: yup.string(),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    repeatPassword: yup
        .string()
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
    console.log(`renders for SignUp`);

    return (
        <div className={classes.signUpContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values): void => console.log(values)}
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
};

export default SignUp;
