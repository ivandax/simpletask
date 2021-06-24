import React from "react";
import { TextField } from "@material-ui/core";

interface StringInputProps {
    value: string;
    onChange: (e: React.ChangeEvent) => void;
    formikTouched: boolean | undefined;
    formikErrors: string | undefined;
    type?: "password";
}

const StringInput = ({
    value,
    onChange,
    formikTouched,
    formikErrors,
}: StringInputProps): JSX.Element => {
    return (
        <TextField
            id="email"
            name="email"
            label="Email"
            value={value}
            onChange={onChange}
            error={formikTouched === undefined ? false : Boolean(formikErrors)}
            helperText={formikTouched === undefined ? null : formikErrors}
        />
    );
};

export default StringInput;
