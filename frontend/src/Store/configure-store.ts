import { createStore, combineReducers, Store, Reducer } from "redux";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { State } from "./state";
import { rootReducer } from "PublicViews/Root/RootReducer";

function createRootReducer(): Reducer {
    return combineReducers<State>({
        root: rootReducer,
    });
}

export function configureStore(): Store<State> {
    const composedEnhancers = composeWithDevTools();
    const store = createStore(createRootReducer(), composedEnhancers);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return store;
}
