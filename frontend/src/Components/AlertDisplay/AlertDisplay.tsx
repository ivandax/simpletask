import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

interface AlertDisplayProps {
    severity: "error" | "warning" | "info" | "success";
    title: string;
    message: string | JSX.Element;
}

const AlertDisplay = ({ severity, title, message }: AlertDisplayProps): JSX.Element => {
    return (
        <Alert severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    );
};

export default AlertDisplay;
