import React from "react";
import { CircularProgress } from "@material-ui/core";

import { useLoadingOverlayStyles } from "./styles";

const LoadingOverlay = (): JSX.Element => {
    const styles = useLoadingOverlayStyles();
    return (
        <div className={styles.container}>
            <CircularProgress />
        </div>
    );
};

export default LoadingOverlay;
