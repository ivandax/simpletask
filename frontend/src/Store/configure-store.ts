import { createStore, applyMiddleware, combineReducers, Store, Reducer } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// store
import { State } from "./state";
import { rootReducer } from "PublicViews/Root/RootReducer";
import { layoutReducer } from "PrivateViews/Layout/LayoutReducer";

// epics
import rootEpics from "PublicViews/Root/RootEpics";
import layoutEpics from "PrivateViews/Layout/LayoutEpics";

function createRootReducer(): Reducer {
    return combineReducers<State>({
        root: rootReducer,
        layout: layoutReducer,
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootEpic: any = combineEpics<any>(...rootEpics, ...layoutEpics);

export function configureStore(): Store<State> {
    const epicMiddleware = createEpicMiddleware({});
    const middlewares = [epicMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    const store = createStore(createRootReducer(), composedEnhancers);

    epicMiddleware.run(rootEpic);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return store;
}
