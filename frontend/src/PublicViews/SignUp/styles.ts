import { makeStyles } from "@material-ui/core";

export const useSignUpStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    signUp: {
        width: "300px",
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
