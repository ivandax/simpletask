import { makeStyles } from "@material-ui/core";

export const useLoginStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    login: {
        width: "300px",
    },
    loginForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submitButton: {
        marginTop: "20px",
        maxWidth: "200px",
    },
    successMessage: {
        display: "flex",
        flexDirection: "column",
    },
    redirectButton: {
        alignSelf: "center",
        marginTop: "20px",
    },
    errorContainer: {
        marginTop: "20px",
    },
    links: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
    },
    link: {
        padding: "4px",
    },
}));
