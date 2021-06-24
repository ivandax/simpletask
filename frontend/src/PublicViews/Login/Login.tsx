import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Container, Box, TextField, Button } from "@material-ui/core";

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

const Login = (): JSX.Element => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "vvvc",
        },
        validationSchema: validationSchema,
        onSubmit: (values): void => console.log(values),
    });

    return (
        <Container>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email === undefined
                                ? false
                                : Boolean(formik.errors.email)
                        }
                        helperText={
                            formik.touched.email === undefined ? false : formik.errors.email
                        }
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password === undefined
                                ? false
                                : Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password === undefined ? false : formik.errors.password
                        }
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
