import React from "react";
import { TextField } from "@material-ui/core";

interface StringInputProps {
    identifier: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent) => void;
    formikTouched: boolean | undefined;
    formikErrors: string | undefined;
    type?: "password";
}

const StringInput = ({
    identifier,
    label,
    value,
    onChange,
    formikTouched,
    formikErrors,
    type,
}: StringInputProps): JSX.Element => {
    console.log(`renders for ${identifier}`);
    return (
        <TextField
            id={identifier}
            name={identifier}
            label={label}
            value={value}
            onChange={onChange}
            error={formikTouched === undefined ? false : Boolean(formikErrors)}
            helperText={formikTouched === undefined ? null : formikErrors}
            type={type}
        />
    );
};

export default StringInput;
