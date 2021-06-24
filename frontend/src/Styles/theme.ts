import { createMuiTheme, Theme } from "@material-ui/core";
import { overrides } from "./overrides";
import { palette } from "./palette";
import { typography } from "./typography";

export const customTheme: Theme = createMuiTheme({
    overrides,
    palette,
    typography,
});
