import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//pages
import Login from "PublicViews/Login/";
import SignUp from "PublicViews/SignUp";
import Verify from "PublicViews/Verify";

// action
import { validateSession } from "./RootReducer";

// state
import { State } from "Store/state";

const PrivateRoute = (): JSX.Element => {
    const dispatch = useDispatch();
    const sessionState = useSelector((state: State) => state.root.sessionValidation);

    useEffect(() => {
        dispatch(validateSession());
    }, []);

    const authenticated = sessionState.status === "successful" && sessionState.data === true;
    if (authenticated === false) {
        return <Redirect to="/login" />;
    } else {
        return <Route path="/app" component={(): JSX.Element => <>You are logged in!</>}></Route>;
    }
};

const Root = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/sign-up" component={SignUp}></Route>
                <Route path="/verify" component={Verify}></Route>
                <PrivateRoute />
            </Switch>
        </Router>
    );
};

export default Root;
