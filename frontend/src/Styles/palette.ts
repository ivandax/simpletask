import { PaletteColor } from "@material-ui/core/styles/createPalette";

export type Palette = {
    primary: PaletteColor;
    warning: PaletteColor;
};

export const palette: Palette = {
    primary: {
        dark: "hsl(210, 58%, 48%)",
        main: "hsl(210, 58%, 58%)",
        light: "hsl(210, 58%, 68%)",
        contrastText: "#fff",
    },
    warning: {
        dark: "hsl(18, 73%, 43%)",
        main: "hsl(18, 73%, 53%)",
        light: "hsl(18, 73%, 63%)",
        contrastText: "#fff",
    },
};
