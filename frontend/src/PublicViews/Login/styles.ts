import { makeStyles } from "@material-ui/core";

export const useRootStyles = makeStyles(() => ({
    loginContainer: {
        width: "300px",
        margin: "0 auto",
        paddingTop: "100px",
    },
    loginForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
