import { Typography } from "@material-ui/core/styles/createTypography";

export const typography: Pick<
    Typography,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2"
> = {
    h1: {
        fontSize: "1.7rem",
        lineHeight: "2rem",
    },
    h2: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
    },
    h3: {
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
    },
    h4: {
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
    },
    h5: {
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
    },
    h6: {
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
    },
    subtitle1: {
        fontSize: "1.2rem",
        lineHeight: "1.5rem",
    },
    subtitle2: {
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
    },
    body1: {
        fontSize: "1rem",
        lineHeight: "1.5",
    },
    body2: {
        fontSize: "0.825rem",
        lineHeight: "1.5",
    },
};
