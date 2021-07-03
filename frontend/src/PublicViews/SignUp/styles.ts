import { makeStyles } from "@material-ui/core";

export const useSignUpStyles = makeStyles(() => ({
    signUpContainer: {
        width: "300px",
        margin: "0 auto",
        paddingTop: "150px",
    },
    signUpForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submitButton: {
        marginTop: "20px",
    },
}));
