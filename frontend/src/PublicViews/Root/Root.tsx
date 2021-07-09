import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//pages
import Login from "PublicViews/Login/";
import SignUp from "PublicViews/SignUp";
import Verify from "PublicViews/Verify";

//components
import LoadingOverlay from "Components/LoadingOverlay";

// action
import { validateSession } from "./RootReducer";

// state
import { State } from "Store/state";

const Main = (): JSX.Element => {
    return <div>Hello world!</div>;
};

const PrivateRoute = (): JSX.Element => {
    const { session } = useSelector((state: State) => state.root);

    if (session === null) {
        return <Redirect to="/login" />;
    } else {
        return <Route path="/app" component={Main}></Route>;
    }
};

const Root = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(validateSession());
    }, []);

    const { sessionValidation } = useSelector((state: State) => state.root);

    switch (sessionValidation.status) {
        case "pending":
        case "in-progress":
        case "re-executing":
            return <LoadingOverlay />;
        case "successful":
        case "failed":
            return (
                <Router>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={(): JSX.Element => <Redirect to="/app" />}
                        />
                        <PrivateRoute />
                        <Route path="/login" component={Login}></Route>
                        <Route path="/sign-up" component={SignUp}></Route>
                        <Route path="/verify" component={Verify}></Route>
                        <Route component={(): JSX.Element => <div>Not found</div>} />
                    </Switch>
                </Router>
            );
    }
};

export default Root;
