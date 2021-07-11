import { makeStyles } from "@material-ui/core";

export const useSetNewPasswordStyles = makeStyles(() => ({
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
    setNewPasswordForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submitButton: {
        marginTop: "20px",
        maxWidth: "200px",
    },
}));
