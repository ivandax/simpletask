import { Overrides } from "@material-ui/core/styles/overrides";

export const overrides: Overrides = {
    MuiCssBaseline: {
        "@global": {
            html: {
                overflow: "hidden",
            },
            body: {
                overflow: "hidden",
            },
        },
    },
    MuiButton: {
        label: {
            textTransform: "none",
        },
    },
};
