import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Container, Box, Button } from "@material-ui/core";

//components
import StringInput from "Components/StringInput";

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

const Login = (): JSX.Element => {
    const initialValues = {
        email: "",
        password: "",
    };
    console.log(`renders for Login`);

    return (
        <Container>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values): void => console.log(values)}
                >
                    {(formik): JSX.Element => (
                        <form onSubmit={formik.handleSubmit}>
                            <StringInput
                                identifier="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                formikTouched={formik.touched.email}
                                formikErrors={formik.errors.email}
                            />
                            <StringInput
                                identifier="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                formikTouched={formik.touched.password}
                                formikErrors={formik.errors.password}
                                type="password"
                            />
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Login;
