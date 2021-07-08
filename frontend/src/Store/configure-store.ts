import { createStore, applyMiddleware, combineReducers, Store, Reducer } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// store
import { State } from "./state";
import { rootReducer } from "PublicViews/Root/RootReducer";

// epics
import rootEpics from "PublicViews/Root/RootEpics";

function createRootReducer(): Reducer {
    return combineReducers<State>({
        root: rootReducer,
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootEpic: any = combineEpics<any>(...rootEpics);

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
