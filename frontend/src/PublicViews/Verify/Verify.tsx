import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useVerifyStyles } from "./styles";

//components
import LoadingOverlay from "Components/LoadingOverlay";
import AlertDisplay from "Components/AlertDisplay";

// redux actions
// import { registerUser } from "PublicViews/Root/RootReducer";

// state
import { State } from "Store/state";

const Verify = (): JSX.Element => {
    const classes = useVerifyStyles();

    // const dispatch = useDispatch();
    const rootState = useSelector((state: State) => state.root);

    const Main = (): JSX.Element => {
        switch (rootState.userRegistration.status) {
            case "pending":
            case "in-progress":
            case "re-executing":
                return (
                    <div className={classes.verify}>
                        {rootState.userRegistration.status === "in-progress" ||
                        rootState.userRegistration.status === "re-executing" ? (
                            <LoadingOverlay />
                        ) : null}
                    </div>
                );
            case "failed":
                return (
                    <AlertDisplay
                        severity="error"
                        title="Verification Problem"
                        message={rootState.userRegistration.error.error}
                    />
                );
            case "successful":
                return (
                    <div className={classes.successMessage}>
                        <AlertDisplay
                            severity="success"
                            title="Your account has been verified"
                            message="You can now access all the features of the platform"
                        />
                        <Button href="/login" variant="outlined" className={classes.redirectButton}>
                            Go to Login
                        </Button>
                    </div>
                );
        }
    };

    return (
        <div className={classes.container}>
            <Main />
        </div>
    );
};

export default Verify;
