import { makeStyles } from "@material-ui/core";
import { custom } from "Styles/palette";

export const useLoadingOverlayStyles = makeStyles(() => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: custom.transparentBlack,
        zIndex: 100,
    },
}));
