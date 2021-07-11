import { RootState } from "PublicViews/Root/RootReducer";
import { LayoutState } from "PrivateViews/Layout/LayoutReducer";

export interface State {
    root: RootState;
    layout: LayoutState;
}
