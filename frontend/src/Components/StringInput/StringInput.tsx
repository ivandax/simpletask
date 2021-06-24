import React from "react";
import { TextField } from "@material-ui/core";

interface StringInputProps {
    identifier: string;
    value: string;
    onChange: (e: React.ChangeEvent) => void;
    formikTouched: boolean | undefined;
    formikErrors: string | undefined;
    type?: "password";
}

const StringInput = ({
    identifier,
    value,
    onChange,
    formikTouched,
    formikErrors,
}: StringInputProps): JSX.Element => {
    console.log(`renders for ${identifier}`);
    return (
        <TextField
            id={identifier}
            name={identifier}
            label={identifier.toUpperCase()}
            value={value}
            onChange={onChange}
            error={formikTouched === undefined ? false : Boolean(formikErrors)}
            helperText={formikTouched === undefined ? null : formikErrors}
        />
    );
};

export default StringInput;
