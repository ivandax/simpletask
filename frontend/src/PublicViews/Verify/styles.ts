import { makeStyles } from "@material-ui/core";

export const useVerifyStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    verify: {
        width: "300px",
    },
    successMessage: {
        display: "flex",
        flexDirection: "column",
    },
    redirectButton: {
        alignSelf: "center",
        marginTop: "20px",
    },
}));
